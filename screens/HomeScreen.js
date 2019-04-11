import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: "search",
      color: "",
      city: "",
      mainHeader: "",
      leftHeaderCard: "",
      leftDescCard: "",
      rightHeaderCard: "",
      rightDescCard: "",
      firstBadge: "",
      secondBadge: "",
      cardTitle: "",
      geoTag: "",
      firstTag: "",
      secondTag: ""
    };

    const rootRef = firebase.database().ref();
    const firstScreenData = rootRef.child("FirstScreen");
    firstScreenData.on("value", snapshot => {
      this.setState({
        city: snapshot.child("city").val(),
        mainHeader: snapshot
          .child("mainCard")
          .child("header")
          .val(),
        mainDesc: snapshot
          .child("mainCard")
          .child("desc")
          .val(),
        leftHeaderCard: snapshot
          .child("leftCard")
          .child("header")
          .val(),
        leftDescCard: snapshot
          .child("leftCard")
          .child("desc")
          .val(),
        rightDescCard: snapshot
          .child("rightCard")
          .child("desc")
          .val(),
        rightHeaderCard: snapshot
          .child("rightCard")
          .child("header")
          .val(),
        firstBadge: snapshot
          .child("card")
          .child("cardBadges")
          .child("firstBadge")
          .val(),
        secondBadge: snapshot
          .child("card")
          .child("cardBadges")
          .child("secondBadge")
          .val(),
        cardTitle: snapshot
          .child("card")
          .child("cardTitle")
          .val(),
        geoTag: snapshot
          .child("card")
          .child("geoTag")
          .val(),
        firstTag: snapshot
          .child("card")
          .child("firstTag")
          .val(),
        secondTag: snapshot
          .child("card")
          .child("secondTag")
          .val()
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.placeHeaderContainer}>
            <View style={[styles.placeHeaderPart, styles.justifyContentStart]}>
              <Ionicons name="ios-arrow-down" size={24} color="#303030" />
              <Text style={styles.cityHomeHeader}>{this.state.city}</Text>
            </View>
            <View style={[styles.placeHeaderPart, styles.justifyContentEnd]}>
              <Ionicons name="ios-pin" size={24} color="#303030" />
              <Ionicons
                style={styles.cityHomeHeader}
                name="ios-options"
                size={24}
                color="#303030"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              onChangeText={searchText => this.setState({ searchText })}
              value={this.state.searchText}
            />
          </View>
          <LinearGradient
            colors={["#5679FF", "#2B44FF"]}
            style={styles.mainDeal}
          >
            <Text style={styles.mainDealHeader}>{this.state.mainHeader}</Text>
            <Text style={styles.dealDescription}>{this.state.mainDesc}</Text>
          </LinearGradient>
          <View style={styles.rowDeals}>
            <LinearGradient
              colors={["#FF4F00", "#CC4001"]}
              style={[styles.dealItem, styles.dealItemLeft]}
            >
              <Text style={styles.dealItemHeader}>
                {this.state.leftHeaderCard}
              </Text>
              <Text style={styles.dealDescription}>
                {this.state.leftDescCard}
              </Text>
            </LinearGradient>
            <LinearGradient
              colors={["#FF5F8B", "#FF7578"]}
              style={[styles.dealItem, styles.dealItemRight]}
            >
              <Text style={styles.dealItemHeader}>
                {this.state.rightHeaderCard}
              </Text>
              <Text style={styles.dealDescription}>
                {this.state.rightDescCard}
              </Text>
            </LinearGradient>
          </View>
          <View style={styles.placeCard}>
            <View style={styles.placeCardImage} />
            <View style={styles.placeCardContent}>
              <View style={styles.placeCardContentBadges}>
                <View style={styles.placeCardBadge}>
                  <Ionicons name="ios-pin" size={16} color="#fff" />
                  <Text style={styles.placeCardBadgeText}>
                    {this.state.firstBadge}
                  </Text>
                </View>
                <View style={styles.placeCardBadgeOutline}>
                  <Text style={styles.placeCardBadgeOutlineText}>
                    {this.state.secondBadge}
                  </Text>
                </View>
              </View>
              <Text style={styles.placeCardContentTitle}>
                {this.state.cardTitle}
              </Text>
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
            </View>
          </View>
          <View style={styles.placeCard}>
            <View style={styles.placeCardImage} />
            <View style={styles.placeCardContent}>
              <View style={styles.placeCardContentBadges}>
                <View style={styles.placeCardBadge}>
                  <Ionicons name="ios-pin" size={16} color="#fff" />
                  <Text style={styles.placeCardBadgeText}>
                    {this.state.firstBadge}
                  </Text>
                </View>
                <View style={styles.placeCardBadgeOutline}>
                  <Text style={styles.placeCardBadgeOutlineText}>
                    {this.state.secondBadge}
                  </Text>
                </View>
              </View>
              <Text style={styles.placeCardContentTitle}>
                {this.state.cardTitle}
              </Text>
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
            </View>
          </View>
          <View style={styles.placeCard}>
            <View style={styles.placeCardImage} />
            <View style={styles.placeCardContent}>
              <View style={styles.placeCardContentBadges}>
                <View style={styles.placeCardBadge}>
                  <Ionicons name="ios-pin" size={16} color="#fff" />
                  <Text style={styles.placeCardBadgeText}>
                    {this.state.firstBadge}
                  </Text>
                </View>
                <View style={styles.placeCardBadgeOutline}>
                  <Text style={styles.placeCardBadgeOutlineText}>
                    {this.state.secondBadge}
                  </Text>
                </View>
              </View>
              <Text style={styles.placeCardContentTitle}>
                {this.state.cardTitle}
              </Text>
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
            </View>
          </View>
          <View style={styles.placeCard}>
            <View style={styles.placeCardImage} />
            <View style={styles.placeCardContent}>
              <View style={styles.placeCardContentBadges}>
                <View style={styles.placeCardBadge}>
                  <Ionicons name="ios-pin" size={16} color="#fff" />
                  <Text style={styles.placeCardBadgeText}>
                    {this.state.firstBadge}
                  </Text>
                </View>
                <View style={styles.placeCardBadgeOutline}>
                  <Text style={styles.placeCardBadgeOutlineText}>
                    {this.state.secondBadge}
                  </Text>
                </View>
              </View>
              <Text style={styles.placeCardContentTitle}>
                {this.state.cardTitle}
              </Text>
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
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8
  },
  placeHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24
  },
  placeHeaderPart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  justifyContentStart: {
    justifyContent: "flex-start"
  },
  justifyContentEnd: {
    justifyContent: "flex-end"
  },
  cityHomeHeader: {
    paddingLeft: 24,
    fontSize: 24,
    fontWeight: "bold"
  },
  searchContainer: {
    marginTop: 24
  },
  searchInput: {
    backgroundColor: "#F2F2F2",
    height: 56,
    borderRadius: 4,
    paddingHorizontal: 18,
    fontSize: 18,
    fontWeight: "bold"
  },
  mainDeal: {
    height: 200,
    backgroundColor: "#2B44FF",
    borderRadius: 5,
    marginTop: 16,
    padding: 16,
    flexDirection: "column",
    justifyContent: "center"
  },
  mainDealHeader: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 16
  },
  dealDescription: {
    color: "#fff",
    fontSize: 12
  },
  rowDeals: {
    flex: 1,
    flexDirection: "row",
    marginTop: 16
  },
  dealItem: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#2B44FF",
    borderRadius: 5,
    height: 112
  },
  dealItemLeft: {
    marginRight: 8
  },
  dealItemRight: {
    marginLeft: 8
  },
  dealItemHeader: {
    fontSize: 21,
    color: "#fff",
    fontWeight: "bold"
  },
  placeCard: {
    flex: 1,
    flexDirection: "column",
    marginTop: 16,
    marginBottom: 32
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
  placeCardContentBadges: {
    flexDirection: "row"
  },
  placeCardBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 100,
    backgroundColor: "#2B44FF",
    borderRadius: 4,
    marginRight: 8,
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
    marginRight: 8,
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
  placeCardContentTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginVertical: 16
  },
  placeCardContentTags: {
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
  }
});
