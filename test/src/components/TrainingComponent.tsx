import React, { useEffect, useState } from "react";
import { TrainingService } from "../api/trainingService";
import { ExerciseService } from "../api/exerciseService";
import { TrainingR } from "../dtos/dtos";
import { ExerciseR } from "../dtos/dtos";

const TrainingComponent = ({ trainingId }) => {
    const [training, setTraining] = useState<TrainingR | null>(null);
    const [exercises, setExercises] = useState<ExerciseR[] | null>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainingData = await TrainingService.getTraining(trainingId);
                setTraining(trainingData);
                const exerciseData = await ExerciseService.getExercisesByTraining(trainingId);
                setExercises(exerciseData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [trainingId]);

    const handleAppendToUser = async () => {
        try {
            await TrainingService.AppendToUser(trainingId);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Training Details</h1>
            {training && (
                <div>
                    <h2>{training.name}</h2>
                    <p>{training.description}</p>
                </div>
            )}

            <h2>Exercises</h2>
            <ul>
                {exercises?.map((exercise) => (
                    <li key={exercise.id}>{exercise.name}</li>
                ))}
            </ul>

            <button onClick={handleAppendToUser}>Append to User</button>
        </div>
    );
};

export default TrainingComponent;
