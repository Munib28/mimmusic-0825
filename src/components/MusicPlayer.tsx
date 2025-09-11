"use client";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipBackward,
  IoMdSkipForward,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { MdOutlineQueueMusic } from "react-icons/md";
import { PlayerContext } from "../../layout/FrontendLayout";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousVolume, setPreviousVolume] = useState(0);
  const [repeatSong, setRepeatSong] = useState(false);

  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("Queue must be used within a Provider");
  }

  const {
    isQueueModalOpen,
    setIsQueueModalOpen,
    currentMusic,
    playNext,
    playPrev,
  } = context;

  const togglePlayButton = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime); // Updating the song every second
      setDuration(audio.duration | 0); // Setting the duration when the metadata is loaded
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    // Unmute music if volume is changed from 0
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume);
      if (audioRef.current) {
        audioRef.current.volume = previousVolume / 100;
      }
    } else {
      // Mute music and save previous volume
      setPreviousVolume(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  // All Side Effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration | 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentMusic) return;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    };
    playAudio();
  }, [currentMusic]);

  // This would listen for when a song ends and automatically play the next song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatSong) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeatSong, playNext]);

  if (!currentMusic) {
    return null; // Don't render the player if there's no current music
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white px-4 py-3 shadow-md z-50">
      <audio src={currentMusic.audio_url || ""} ref={audioRef}></audio>
      <div className="max-w-8xl w-[95%] mx-auto flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src={currentMusic.cover_image_url || ""}
            alt="cover-image"
            width={500}
            height={500}
            className="w-13 h-13 object-cover rounded-md"
          />
          <div className="text-sm">
            <p className="text-white">{currentMusic.title}</p>
            <p className="text-secondary-text font-normal">
              {currentMusic.artist}
            </p>
          </div>
        </div>

        {/* Song Controls */}
        <div className="max-w-[400px] w-full flex flex-col items-center gap-3">
          <div className="flex gap-4">
            <button
              onClick={playPrev}
              className="text-xl text-secondary-text hover:opacity-60 transition-opacity"
            >
              <IoMdSkipBackward />
            </button>
            <button
              onClick={togglePlayButton}
              className="bg-white text-xl text-black w-10 h-10 rounded-full grid place-items-center hover:bg-primary transition-colors"
            >
              {isPlaying ? <IoMdPause /> : <IoMdPlay />}
            </button>
            <button
              onClick={playNext}
              className="text-xl text-secondary-text hover:opacity-60 transition-opacity"
            >
              <IoMdSkipForward />
            </button>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <span className="text-secondary-text font-normal text-sm">
              {formatTime(currentTime)}
            </span>
            <div className="w-full">
              <input
                onChange={handleSeek}
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                className="w-full outline-non h-1 bg-zinc-700 rounded-md appearance-none accent-white"
              />
            </div>
            <span className="text-secondary-text font-normal text-sm">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          {repeatSong ? (
            <button onClick={() => setRepeatSong(false)} className="text-primary text-xl cursor-pointer">
              <LuRepeat1 />
            </button>
          ) : (
            <button onClick={() => setRepeatSong(true)} className="text-secondary-text text-xl cursor-pointer">
              <LuRepeat />
            </button>
          )}

          <button
            onClick={() => {
              setIsQueueModalOpen(!isQueueModalOpen);
            }}
            className="text-secondary-text text-xl cursor-pointer"
          >
            <MdOutlineQueueMusic />
          </button>
          <button
            onClick={toggleMute}
            className="text-secondary-text text-xl cursor-pointer"
          >
            {volume === 0 ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
          </button>
          <input
            onChange={handleVolumeChange}
            value={volume}
            type="range"
            min="0"
            max="100"
            className="w-[100px] outline-none h-1 bg-zinc-700 accent-white appearance-none hover:opacity-70 transition-opacity cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
