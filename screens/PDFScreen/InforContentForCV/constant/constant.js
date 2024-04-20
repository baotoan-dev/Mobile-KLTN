import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export const ContentEditForCv = [
    {
        id : 1,
        title: 'Personal Information',
        icon: <MaterialIcons name="broadcast-on-personal" size={24} color="black" />,
        screen: 'PersonalInformation'
    },
    {
        id: 2,
        title: 'Education',
        icon: <MaterialCommunityIcons name="book-education" size={24} color="black" />,
        screen: 'Education'
    },
    {
        id: 3,
        title: 'Certification',
        icon: <Ionicons name="duplicate-outline" size={24} color="black" />,
        screen: 'Certification'
    },
    {
        id: 4,
        title: 'Project',
        icon:<FontAwesome5 name="project-diagram" size={24} color="black" />,
        screen: 'Project'
    }
];
