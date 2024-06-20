import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export const ContentEditForCv = [
    {
        id : 1,
        title: 'Personal Information',
        icon: <MaterialCommunityIcons name="human" size={20} color="black" />,
        screen: 'PersonalInformation'
    },
    {
        id: 2,
        title: 'Education',
        icon: <MaterialCommunityIcons name="book-education" size={20} color="black" />,
        screen: 'Education'
    },
    {
        id: 3,
        title: 'Certification',
        icon: <MaterialCommunityIcons name="certificate" size={20} color="black" />,
        screen: 'Certification'
    },
    {
        id: 4,
        title: 'Project',
        icon:<FontAwesome5 name="project-diagram" size={20} color="black" />,
        screen: 'Project'
    },
    {
        id: 5,
        title: 'Skill',
        icon: <Foundation name="social-skillshare" size={20} color="black" />,
        screen: 'Skill'
    },
    {
        id: 6,
        title: 'Award',
        icon: <Ionicons name="ios-ribbon" size={20} color="black" />,
        screen: 'Award'
    }
];
