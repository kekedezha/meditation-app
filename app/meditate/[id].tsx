import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import AntDesign from '@expo/vector-icons/AntDesign'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av';
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import { TimerContext } from '@/context/TimerContext'

const Page = () => {
    const { id } = useLocalSearchParams();
    const { duration, setDuration } = useContext(TimerContext);
    const [isMeditating, setIsMeditating] = useState(false);
    const [audioSound, setAudioSound] = useState<Audio.Sound>();
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // Exit
        if (duration === 0) {
            setIsMeditating(false);
            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setDuration(duration - 1)
            }, 1000)
        }

        return () => {
            clearTimeout(timerId)
        }
    }, [duration, isMeditating])

    useEffect(() => {
        return () => {
            setDuration(10);
            audioSound?.unloadAsync();
        }
    }, [audioSound])
    // Format the countdown timer to ensure two digits are displayed.
    const formattedTimeM = String(
        Math.floor(duration / 60)
    ).padStart(2, "0");

    const formattedTimeS = String(
        Math.floor(duration % 60)
    ).padStart(2, "0");

    // Reset timer once it finishes and toggle isMeditating 
    const toggleMeditationSessionStatus = async () => {
        if (duration === 0) setDuration(10);

        setIsMeditating(!isMeditating);

        await toggleSound();
    };

    // Toggle meditation sound when timer is playing
    const toggleSound = async () => {
        // Assign state variable to local sound constant if available. If not, await assignation 
        const sound = audioSound ? audioSound : await initializeSound();

        //get status of loaded sound
        const status = await sound?.getStatusAsync();

        //if status has finished loading a sound then play, else pause sound
        if (status?.isLoaded && !isAudioPlaying) {
            await sound.playAsync();
            setIsAudioPlaying(true);
        } else {
            await sound.pauseAsync();
            setIsAudioPlaying(false);

        }
    }

    // Get sound file from meditation id and assign the state variable
    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileName]
        );

        setAudioSound(sound);

        return sound;
    }

    const handleAdjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus();

        router.push("/(modal)/adjust-meditation-duration");
    }

    return (
        <View className='flex-1'>
            <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]}
                resizeMode='cover'
                className='flex-1'
            >
                <AppGradient colors={["rgba(0,0,0,0.3", "rgba(0,0,0,0.8)"]}>
                    <Pressable onPress={() => router.back()}
                        className='absolute top-16 left-6 z-10'>
                        <AntDesign name='leftcircleo' size={50} color="white" />
                    </Pressable>

                    <View className='flex-1 justify-center'>
                        <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
                            <Text className='text-4xl text-blue-800 font-rmono'>{formattedTimeM}:{formattedTimeS}</Text>
                        </View>
                    </View>

                    <View className='mb-5'>
                        <CustomButton
                            title='Adjust Duration'
                            onPress={handleAdjustDuration}
                        />
                        <CustomButton
                            title={isMeditating ? 'Stop' : 'Start Meditating'}
                            onPress={toggleMeditationSessionStatus}
                            containerStyles='mt-4'
                        />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Page