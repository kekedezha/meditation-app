import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import AntDesign from '@expo/vector-icons/AntDesign'
import CustomButton from '@/components/CustomButton'

const Page = () => {
    const { id } = useLocalSearchParams();
    const [secondsRemaining, setSecondsRemaining] = useState(10);
    const [isMeditating, setIsMeditating] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // Exit
        if (secondsRemaining === 0) {
            setIsMeditating(false);
            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setSecondsRemaining(secondsRemaining - 1)
            }, 1000)
        }


        return () => {
            clearTimeout(timerId)
        }
    }, [secondsRemaining, isMeditating])

    // Format the countdown timer to ensure two digits are displayed.
    const formattedTimeM = String(
        Math.floor(secondsRemaining / 60)
    ).padStart(2, "0");

    const formattedTimeS = String(
        Math.floor(secondsRemaining % 60)
    ).padStart(2, "0");

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
                        <CustomButton title='Start Meditation'
                            onPress={() => setIsMeditating(true)} />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Page