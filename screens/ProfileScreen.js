import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import * as firebase from "firebase";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerStyle: {
      borderBottomWidth: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      orders: [],
      reputation: null,
      age: null,
      rating: null,
      name: "",
      image:
        "https://code.market/wp-content/uploads/2019/02/mira-icon-logo-react-native-theme.png"
    };

    const rootRef = firebase.database().ref();
    const firstScreenData = rootRef.child("ProfileScreen");
    firstScreenData.on("value", snapshot => {
      this.setState({
        city: snapshot.child("city").val(),
        reputation: snapshot.child("reputation").val(),
        content: snapshot.child("content").val(),
        image: snapshot.child("image").val(),
        age: snapshot.child("age").val(),
        name: snapshot.child("name").val(),
        rating: snapshot.child("rating").val(),
        orders: snapshot.child("orders").val()
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.contentContainer, styles.withShadow]}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: this.state.image }}
                style={styles.welcomeImage}
              />
            </View>
            <View style={styles.centerContainer}>
              <Text style={styles.profileName}>{this.state.name}</Text>
              <Text style={styles.profileCity}>{this.state.city}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.profileAttributes}>
              <View style={styles.profileBadge}>
                <Text style={styles.profileBadgeValue}>
                  {this.state.rating}
                </Text>
                <Text style={styles.profileBadgeLabel}>Rating</Text>
              </View>
              <View style={styles.profileBadge}>
                <Text style={styles.profileBadgeValue}>
                  {this.state.reputation}
                </Text>
                <Text style={styles.profileBadgeLabel}>Orders</Text>
              </View>
              <View style={styles.profileBadge}>
                <Text style={styles.profileBadgeValue}>{this.state.age}</Text>
                <Text style={styles.profileBadgeLabel}>Age</Text>
              </View>
            </View>
          </View>
          <View style={styles.ordersContainer}>
            {this.state.orders.map((prop, key) => {
              return (
                <View style={styles.orderContainer} key={key}>
                  <View style={styles.orderContentContainer}>
                    <Text style={styles.orderTitle}>{prop.title}</Text>
                    <Text style={styles.orderContent}>{prop.content}</Text>
                    <View style={styles.orderPriceRow}>
                      <Text style={styles.orderPrice}>{prop.price}</Text>
                      <Text style={styles.orderOldPrice}>{prop.oldPrice}</Text>
                    </View>
                  </View>
                  <View style={styles.orderImageContainer}>
                    <Image
                      source={{ uri: prop.image }}
                      style={styles.orderImage}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    padding: 16
  },
  centerContainer: {
    alignItems: "center"
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#DDEDFD",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 10
  },
  welcomeImage: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    borderRadius: 65
  },
  profileName: {
    fontSize: 32,
    fontWeight: "bold"
  },
  profileCity: {
    fontSize: 18
  },
  profileAttributes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  profileBadge: {
    flex: 1,
    textAlign: "center",
    alignItems: "center"
  },
  line: {
    backgroundColor: "#DDE3E9",
    height: 1,
    marginVertical: 24
  },
  profileBadgeValue: {
    fontSize: 18,
    fontWeight: "bold"
  },
  profileBadgeLabel: {
    fontSize: 16
  },
  ordersContainer: {
    paddingVertical: 8
  },
  orderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 24
  },
  orderContentContainer: {
    flex: 1,
    paddingRight: 32,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  orderTitle: {
    fontSize: 21,
    fontWeight: "bold"
  },
  orderContent: {
    fontSize: 12,
    color: "#AFB9C5"
  },
  orderPriceRow: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: "bold"
  },
  orderOldPrice: {
    fontSize: 14,
    fontWeight: "normal",
    paddingLeft: 16,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  orderImageContainer: {},
  orderImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 5
  },
  withShadow: {
    backgroundColor: "#fff",
    shadowColor: "#DDEDFD",
    shadowOpacity: 1,
    shadowOffset: {
      height: 4,
      width: 0
    }
  }
});
