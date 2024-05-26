import { View, ScrollView } from 'react-native'
import React from 'react'
import { Tab } from '@rneui/themed';
import { useState } from 'react'
import InforTabComponent from './InforTabComponent/InforTabComponent';
import JobTabComponent from './JobTabComponent/JobTabComponent';
import CompanyTabComponent from './CompanyTabComponent/CompanyTabComponent';

export default function TabPostComponent({ post }) {
    const [index, setIndex] = useState(0);

    return (
        <View style={{
            height: '100%',
            backgroundColor: 'white',
        }}>
            <Tab value={index} onChange={setIndex} dense>
                <Tab.Item
                    titleStyle={{
                        color: '#242670'
                    }}>Thông tin
                </Tab.Item>
                <Tab.Item
                    titleStyle={{
                        color: '#242670'
                    }}
                >Việc làm
                </Tab.Item>
                <Tab.Item
                    titleStyle={{
                        color: '#242670'
                    }}>
                    Công ty
                </Tab.Item>
            </Tab>
            <View>
                {index === 0 && <InforTabComponent post={post} />}
                {index === 1 && <JobTabComponent post={post} />}
                {index === 2 && <CompanyTabComponent post={post} />}
            </View>
        </View>
    )
}