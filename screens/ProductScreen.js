import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";

export default class ProductScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      price: null,
      reputation: null,
      date: null,
      sku: "",
      title: "",
      image: "uri",
      geoTag: "",
      firstTag: "",
      secondTag: "",
      dishes: [],
      returnArr: []
    };

    const rootRef = firebase.database().ref();
    const firstScreenData = rootRef.child("ProductScreen");
    const dishesData = rootRef.child("ProductScreen").child("dishes");
    const reviewsData = rootRef.child("ProductScreen").child("reviews");
    firstScreenData.on("value", snapshot => {
      this.setState({
        city: snapshot.child("city").val(),
        reputation: snapshot.child("reputation").val(),
        content: snapshot.child("content").val(),
        image: snapshot.child("image").val(),
        date: snapshot.child("date").val(),
        title: snapshot.child("title").val(),
        geoTag: snapshot.child("geoTag").val(),
        price: snapshot.child("price").val(),
        firstTag: snapshot.child("firstTag").val(),
        secondTag: snapshot.child("secondTag").val(),
        dishes: snapshot.child("dishes").val()
      });
    });

    dishesData.on("value", dataSnapshot => {
      var dishesArray = [];
      dataSnapshot.forEach(child => {
        dishesArray.push({
          title: child.child("title").val(),
          desc: child.child("content").val(),
          price: child.child("price").val(),
          priceOld: child.child("oldPrice").val()
        });
      });

      this.setState({
        dishesArray: dishesArray
      });
    });

    reviewsData.on("value", dataSnapshot => {
      var reviewsArray = [];
      dataSnapshot.forEach(child => {
        reviewsArray.push({
          colorFirst: child.child("firstColor").val(),
          colorSecond: child.child("secondColor").val(),
          imageAuthor: child.child("imageAuthor").val(),
          review: child.child("review").val(),
          author: child.child("author").val()
        });
      });

      this.setState({
        reviewsArray: reviewsArray
      });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {console.log(this.state.reviewsArray)}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: this.state.image }}
            style={styles.welcomeImage}
          />
          <View style={styles.placeCardContentBadges}>
            <View style={styles.placeCardBadge}>
              <Ionicons name="ios-pin" size={16} color="#fff" />
              <Text style={styles.placeCardBadgeText}>20% off</Text>
            </View>
            <View style={styles.placeCardBadgeOutline}>
              <Text style={styles.placeCardBadgeOutlineText}>
                Order till 21:00
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.productContentContainer}>
          <Text style={styles.productTitle}>{this.state.title}</Text>
          <View style={styles.placeCardContentTags}>
            <Ionicons name="ios-pin" size={16} color="#2B44FF" />
            <Text style={styles.placeCardContentTagTextAlert}>
              {this.state.geoTag}
            </Text>
            <View style={styles.silentDot} />
            <Text style={styles.placeCardContentTagTextSilent}>
              {this.state.firstTag}
            </Text>
            <View style={styles.silentDot} />
            <Text style={styles.placeCardContentTagTextSilent}>
              {this.state.secondTag}
            </Text>
          </View>
          <Text style={styles.productContentText}>{this.state.content}</Text>
          <View style={styles.couponContainer}>
            <Ionicons name="ios-pricetag" size={20} color="#FF5F8B" />
            <View style={styles.couponTextContainer}>
              <Text style={styles.couponTitle}>
                10% off every menu item today
              </Text>
              <Text style={styles.couponDesc}>
                Being the savage's bowsman, that is, the person who pulled the
                bow-oar.
              </Text>
            </View>
          </View>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsLabel}>Reviews</Text>
            <View style={styles.reviewsCardsContainer}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.reviewsArray}
                renderItem={({ item }) => {
                  return (
                    <LinearGradient
                      colors={[item.colorFirst, item.colorSecond]}
                      style={styles.reviewCard}
                    >
                      <Text style={styles.reviewCardText}>{item.review}</Text>
                      <View style={styles.cardAuthorContainer}>
                        <Image
                          source={{ uri: item.imageAuthor }}
                          style={styles.cardAuthorImage}
                        />
                        <Text style={styles.cardAuthorName}>{item.author}</Text>
                      </View>
                    </LinearGradient>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>

          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsLabel}>Main Dishes</Text>
            <View style={styles.reviewsCardsContainer}>
              {this.state.dishes.map((prop, key) => {
                {
                  this.state.returnArr.push({
                    title: prop.title,
                    desc: prop.content,
                    price: prop.price,
                    priceOld: prop.oldPrice
                  });
                }
              })}

              <FlatList
                data={this.state.dishesArray}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.orderContainer}>
                      <View style={styles.orderContentContainer}>
                        <Text style={styles.orderTitle}>{item.title}</Text>
                        <Text style={styles.orderContent}>{item.desc}</Text>
                        <View style={styles.orderPriceRow}>
                          <Text style={styles.orderPrice}>{item.price}</Text>
                          <Text style={styles.orderOldPrice}>
                            {item.priceOld}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.orderImageContainer}>
                        <Image
                          source={{
                            uri:
                              "https://cdn.playbuzz.com/cdn/4e280c69-84bc-4bd4-9907-79f87958fd2f/22bc689f-be91-43e2-89ca-5ec2cf1cdfe1.png"
                          }}
                          style={styles.orderImage}
                        />
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  welcomeImage: {
    width: "100%",
    height: 240,
    resizeMode: "contain"
  },
  placeCardContentBadges: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeCardBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 100,
    backgroundColor: "#2B44FF",
    borderRadius: 4,
    marginTop: -17,
    marginLeft: 16,
    padding: 8
  },
  placeCardBadgeOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 100,
    borderWidth: 1,
    borderColor: "#2B44FF",
    backgroundColor: "#fff",
    borderRadius: 4,
    marginRight: 16,
    marginTop: -17,
    padding: 8
  },
  placeCardBadgeOutlineText: {
    color: "#2B44FF",
    fontSize: 10,
    fontWeight: "bold"
  },
  placeCardBadgeText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold"
  },
  productContentContainer: {
    padding: 16
  },
  productTitle: {
    fontSize: 28,
    fontWeight: "bold"
  },
  placeCard: {
    flex: 1,
    flexDirection: "column",
    marginTop: 16
  },
  placeCardImage: {
    borderRadius: 5,
    height: 182,
    backgroundColor: "#DDEDFD"
  },
  placeCardContent: {
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: -32,
    padding: 8,
    marginHorizontal: 16,
    shadowColor: "#DDEDFD",
    shadowOpacity: 1,
    shadowOffset: {
      height: 4,
      width: 0
    }
  },
  placeCardContentTags: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  placeCardContentTagTextAlert: {
    marginLeft: 8,
    color: "#2B44FF",
    fontSize: 14,
    fontWeight: "bold"
  },
  placeCardContentTagTextSilent: {
    color: "#787878",
    fontSize: 12
  },
  silentDot: {
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: "#787878",
    marginHorizontal: 8
  },
  productContentText: {
    fontSize: 12,
    color: "#787878",
    marginBottom: 16
  },
  couponContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
    paddingVertical: 16,
    paddingRight: 80
  },
  couponTextContainer: {
    marginLeft: 24
  },
  couponTitle: {
    color: "#303030",
    fontSize: 14,
    fontWeight: "bold"
  },
  couponDesc: {
    color: "#787878",
    marginTop: 8,
    fontSize: 12
  },
  reviewsContainer: {
    marginTop: 24
  },
  reviewsLabel: {
    fontSize: 21,
    fontWeight: "bold"
  },
  reviewsCardsContainer: {
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "#DDE3E9"
  },
  reviewCard: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    width: 280,
    height: 165,
    marginRight: 16,
    borderRadius: 5
  },
  reviewCardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  cardAuthorContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  cardAuthorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 8
  },
  cardAuthorName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff"
  },
  ordersContainer: {
    paddingVertical: 8
  },
  orderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16
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
  }
});
