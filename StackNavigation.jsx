import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Color } from './utils/Color';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import LoginScreeForEmailAndPassword from './screens/LoginScreen/LoginScreeForEmailAndPassword';
import { AuthContext } from './App';
import { useContext } from 'react';
import CompanyDetail from './screens/Components/Company/CompanyDetail/CompanyDetail';
import PostDetail from './screens/Components/Post/PostDetail/PostDetail';
import Search from './screens/Components/Search/Search';
import SearchResult from './screens/Components/Search/SearchResult/SearchResult';
import Filter from './screens/Components/Search/Filter/Filter';
import DetailBlog from './screens/Components/Blog/DetailBlog/DetailBlog';
import SeeAllBlog from './screens/Components/Blog/SeeAllBlog/SeeAllBlog';
import MoreInforOfTopCompany from './screens/Components/Company/MoreInforOfTopCompany/MoreInforOfTopCompany';
import Application from './screens/Components/Application/Application';
import NotifyScreen from './screens/NotifyScreen/NotifyScreen';
import CVScreen from './screens/CVScreen/CVScreen';
import ModifyPassword from './screens/ProfileScreen/ContentProfile/SettingProfile/ModifyPassword/ModifyPassword';
import DisablePassAccount from './screens/ProfileScreen/ContentProfile/SettingProfile/DisablePassAccount/DisablePassAccount';
import ManageJobApplication from './screens/ProfileScreen/ContentProfile/ManageFindJob/ManageJobApplication/ManageJobApplication';
import AllPostNewest from './screens/Components/Post/AllPostNewest/AllPostNewest';
import ChatScreen from './screens/ChatScreen/ChatScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Color.white,
                    shadowColor: Color.black,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        focused ? <Foundation name="home" size={24} color={Color.primary} /> : <Foundation name="home" size={24} color={Color.secondary} />
                    ),
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 13,
                    },
                }}
            />
            <Tab.Screen name="CV" component={CVScreen}
                options={{
                    tabBarLabel: 'CV',
                    tabBarIcon: ({ color, size, focused }) => (
                        focused ? <MaterialCommunityIcons name="file-document" size={24} color={Color.primary} /> : <MaterialCommunityIcons name="file-document" size={24} color={Color.secondary} />
                    ),
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 13,
                    },
                }}
            />
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color, size, focused }) => (
                    focused ? <MaterialCommunityIcons name="chat" size={24} color={Color.primary} /> : <MaterialCommunityIcons name="chat" size={24} color={Color.secondary} />
                ),
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 13,
                },
            }} />
            <Tab.Screen name="Notification" component={NotifyScreen}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size, focused }) => (
                        focused ? <MaterialCommunityIcons name="bell" size={24} color={Color.primary} /> : <MaterialCommunityIcons name="bell" size={24} color={Color.secondary} />
                    ),
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 13,
                    },
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        focused ? <MaterialCommunityIcons name="account" size={24} color={Color.primary} /> : <MaterialCommunityIcons name="account" size={24} color={Color.secondary} />
                    ),
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 13,
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

function Navigation() {
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !auth ? (
                        <>
                            <Stack.Screen name="LoginEmailAndPassword" component={LoginScreeForEmailAndPassword} options={{
                                headerShown: false,
                            }} />
                            <Stack.Screen name="Login" component={LoginScreen} options={{
                                headerShown: false,
                            }} />
                        </>)
                        :
                        (
                            <Stack.Screen name="Main" component={BottomTabs} options={{
                                headerShown: false,
                            }} />
                        )
                }
                {/* company */}
                <Stack.Screen name="CompanyDetail" component={CompanyDetail} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name='MoreInforOfTopCompany' component={MoreInforOfTopCompany} options={{
                    headerShown: false,
                }} />

                {/* post */}
                <Stack.Screen name="PostDetail" component={PostDetail} options={{
                    headerShown: false,
                }} />

                <Stack.Screen name='AllPostNewest' component={AllPostNewest} options={{
                    headerShown: false,
                }} />

                {/* search */}
                <Stack.Screen name="Search" component={Search} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="SearchResult" component={SearchResult} options={{
                    headerShown: false,
                }} />

                {/* filter */}
                <Stack.Screen name="Filter" component={Filter} options={{
                    headerShown: false,
                }} />

                {/* blog */}
                <Stack.Screen name="DetailBlog" component={DetailBlog} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="SeeAllBlog" component={SeeAllBlog} options={{
                    headerShown: false,
                }} />

                {/* applicaton */}
                <Stack.Screen name="Application" component={Application} options={{
                    headerShown: false,
                }} />

                {/* Setting profile */}
                <Stack.Screen name="ModifyPassword" component={ModifyPassword} options={{
                    headerShown: false,
                }} />

                <Stack.Screen name='DisablePassAccount' component={DisablePassAccount} options={{
                    headerShown: false,
                }} />

                {/* Manage Find Job */}
                <Stack.Screen name="ManageJobApplication" component={ManageJobApplication} options={{
                    headerShown: false,
                }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;