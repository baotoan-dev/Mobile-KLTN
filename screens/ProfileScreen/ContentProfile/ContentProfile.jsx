import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import JobExpect from './JobExpect/JobExpect';
import AddressExpect from './AddressExpect/AddressExpect';
import ManageRecord from './ManageRecord/ManageRecord';
import ManageFindJob from './ManageFindJob/ManageFindJob';
import SettingProfile from './SettingProfile/SettingProfile';
import Logout from './Logout/Logout';

export default function ContentProfile({ isScrolling, profile }) {

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: isScrolling ? 50 : 210,
            height: '100%',
        }}>
            <ScrollView
                scrollEventThrottle={16}>
                <View>
                    {profile && (<JobExpect profile={profile}/>)} 
                    {profile && (<AddressExpect profile={profile}/>)}
                    {profile && (<ManageRecord />)}
                    <ManageFindJob/>
                    {profile && (<SettingProfile />)}
                    {profile && (<Logout />)}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}