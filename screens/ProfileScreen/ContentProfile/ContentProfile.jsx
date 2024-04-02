import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import JobExpect from './JobExpect/JobExpect';
import AddressExpect from './AddressExpect/AddressExpect';
import ManageRecord from './ManageRecord/ManageRecord';

export default function ContentProfile({ setIsScrolling, isScrolling, profile }) {

    const handleScroll = (event) => {
        if (event.nativeEvent.contentOffset.y > 0) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    };
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: isScrolling ? 0 : 90,
        }}>
            <ScrollView
                onScrollEndDrag={handleScroll}
                scrollEventThrottle={16}
                style={{
                    height: 600,
                }}
            >
                <View
                    style={{
                        height: 4000,
                    }}
                >
                    {profile && (<JobExpect profile={profile}/>)} 
                    {profile && (<AddressExpect profile={profile}/>)}
                    {profile && (<ManageRecord />)}
                </View>
            </ScrollView>
        </View>
    )
}