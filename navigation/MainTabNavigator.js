import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  ),
  tabBarOptions: {
    activeTintColor: "#2A43FC",
    inactiveTintColor: "#303030",
    labelStyle: {
      fontWeight: "bold"
    },
    style: {
      height: 60,
      paddingVertical: 7,
      borderTopWidth: 0,
      backgroundColor: "#fff",
      shadowColor: "#DDEDFD",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 1,
      shadowRadius: 16
    }
  }
};

const ProductStack = createStackNavigator({
  Product: ProductScreen
});

ProductStack.navigationOptions = {
  tabBarLabel: "Product",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-pricetag" : "md-pricetag"}
    />
  ),
  tabBarOptions: {
    activeTintColor: "#2A43FC",
    inactiveTintColor: "#303030",
    labelStyle: {
      fontWeight: "bold"
    },
    style: {
      height: 60,
      paddingVertical: 7,
      borderTopWidth: 0,
      backgroundColor: "#fff",
      shadowColor: "#DDEDFD",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 1,
      shadowRadius: 16
    }
  }
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  ),
  tabBarOptions: {
    style: {
      height: 60,
      paddingVertical: 7,
      borderTopWidth: 0,
      backgroundColor: "#fff",
      shadowColor: "#DDEDFD",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 1,
      shadowRadius: 16
    },
    activeTintColor: "#2A43FC",
    inactiveTintColor: "#303030",
    labelStyle: {
      fontWeight: "bold"
    }
  }
};

export default createBottomTabNavigator({
  HomeStack,
  ProductStack,
  ProfileStack
});
