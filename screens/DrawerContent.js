import React from 'react';
import {
    StyleSheet,
    View,
  } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { 
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

  export function DrawerContent(props) {
      
    const [isDarkTheme,setIsDarkTheme]=React.useState(false);
    const toggleTheme=() =>
    {
        setIsDarkTheme(!isDarkTheme);
    }

    
      return(
          <View style={{flex:1}}>
              <DrawerContentScrollView {...props}>
                  <View style={styles.drawerContent}>
                      <View  style={styles.userInfoSection}>
                          <View style={{flexDirection:'row',marginTop:15}}>
                              <Avatar.Image
                                source={{
                                    uri:'https://reactnative.dev/img/tiny_logo.png'
                                }}
                                size={50}
                              />
                              <View style={{flexDirection:'column',marginLeft:15}}>
                              <Title style={styles.title}>Manav Jaiswal</Title>
                              <Caption style={styles.caption}>@siege</Caption>
                              </View>
                          </View>
                          <View style={styles.row}>
                              <View style={styles.section}>
                              <Text style={[styles.paragraph,styles.caption]}>Followers</Text>
                              <Paragraph styles={styles.caption}>100</Paragraph>
                              </View>
                              <View style={styles.section}>
                              <Text style={[styles.paragraph,styles.caption]}>Following</Text>
                              <Paragraph styles={styles.caption}>10</Paragraph>
                              </View>
                          </View>
                      </View>
                      <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                        icon={({color,size}) => (
                            <Icon
                            name="home"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                        icon={({color,size}) => (
                            <Icon
                            name="person"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Profile"
                        onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem
                        icon={({color,size}) => (
                            <Icon
                            name="construct"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Details"
                        onPress={() => {props.navigation.navigate('Details')}}
                        />
                        <DrawerItem
                        icon={({color,size}) => (
                            <Icon
                            name="man"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Feed"
                        onPress={() => {props.navigation.navigate('Feed')}}
                        />
                      </Drawer.Section>
                      <Drawer.Section title="Preferences">
                          <TouchableRipple onPress={() => {toggleTheme()}}>
                              <View style={styles.preference}>
                                  <Text>Dark Theme</Text>
                                  <View pointerEvents='none'>
                                        <Switch value={isDarkTheme}/>
                                  </View>
                              </View>
                          </TouchableRipple>
                      </Drawer.Section>
                  </View>
              </DrawerContentScrollView>
              <Drawer.Section style={StyleSheet.bottomDrawerSection}>
                  <DrawerItem
                    icon={({color,size}) => (
                        <Icon
                        name="log-out"
                        color={color}
                        size={size}
                        />
                    )}
                    label="sign out"
                    onPress={() => {}}
                  />
              </Drawer.Section>
          </View>
      )
  }

  
  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });