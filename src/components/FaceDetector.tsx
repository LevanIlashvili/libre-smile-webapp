import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as faceapi from "face-api.js";
import LibreClient from '../service/LibreClient';

interface FaceDetectorProps {
    user: string;
}
export function FaceDetector(props: FaceDetectorProps) {
    const videoRef = useRef<any>(null);
    const [detectionInterval, setDetectionInterval] = useState<any>(null);
    const [isHappy, setIsHappy] = useState(false);

    useEffect(() => {
        startVideo();
      }, []);

    useEffect(() => {
        startVideo();
        videoRef && loadModels();
    }, []);

    useEffect(() => {
        if (isHappy) {
            LibreClient.confirmSmile(props.user);
        }
    }, [isHappy]);

     const loadModels = () => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(() => {
         faceDetection();
        })
     };
     const faceDetection = () => {
        const interval = setInterval(async () => {
            const detection = await faceapi.detectSingleFace 
            (videoRef.current, new faceapi.TinyFaceDetectorOptions())
             .withFaceLandmarks()
             .withFaceExpressions();
            if (detection) {
                if (detection.expressions && detection.expressions.happy && detection.expressions.happy > 0.8) {
                    setIsHappy(true);
                    clearInterval(interval);
                }
            }
        }, 3000);
        setDetectionInterval(interval);
     }
     
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true    })
        .then((currentStream) => {
               videoRef.current!.srcObject = currentStream;
            }).catch((err) => {
                console.error(err)
        });
    }
      
    return (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        flexDirection='column'
      >
        
        {
            !isHappy && (
                <>
                    <Typography variant='h4'>Say LIBRE</Typography>
                    <video crossOrigin='anonymous' ref={videoRef} autoPlay style={{width: 800, height: 600, marginTop: 20}}></video>
                </>
            )
        }
        {
            isHappy && (
                <><Typography variant='h4'>Thanks for the smile 😊</Typography><Typography variant='h5' style={{marginTop: 20}}>You will receive 1 SAT on your Libre account</Typography></>
            )
        }
        
      </Box>
    );
}