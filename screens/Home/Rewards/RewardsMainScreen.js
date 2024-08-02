/**
 * Code for the rewards screen where users can check their current goals. Users are provided with the current 
 * reward goal, and the next rewards, after the completion of the current reward goal. Note that the user cannot
 * access the next reward if the current is not completed. Also the screen outputs the user's list of rewards,
 * varing from the redeeem, redeemed, and expired rewards. Each rewards has an expiry date if not redeemed in time.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Function component for the Reward main screen 
const RewardsScreen = () => {
  // Consts for the navigation, current progress and goal in Km, and calculate the progress percentage.
  const navigation = useNavigation();
  const progress = 17.5;
  const goal = 20;
  const progressWidth = (progress / goal) * 100;

  //Return statements that output the rewards screen
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Rewards</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.currentRewardContainer}>
          <Text style={styles.currentRewardTitle}>Current Reward Target</Text>
          <Text style={styles.currentRewardDescription}>
            15 % off public Transport
          </Text>
          <View style={styles.rewardInfoContainer}>
            <View>
              <Text style={styles.rewardStarsTitle}>Reward Stars</Text>
              <Text style={styles.rewardStarsValue}>175 ★</Text>
              <Text style={styles.rewardStarsDetails}>
                Walk 2.5 kilometres to receive your reward.
              </Text>
              <Text style={styles.rewardStarsPerKm}>
                10 stars per km walked
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.goalText}>Goal: 20 km</Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progress, { width: `${progressWidth}%` }]}
                />
              </View>
              <Text style={styles.progressText}>{progress} km</Text>
            </View>
          </View>
        </View>
        <View style={styles.rewardSection}>
          <View style={styles.rewardCardDisabled}>
            <Text style={styles.nextRewardTitle}>Next Reward</Text>
            <Text style={styles.nextReward}>20% off HP</Text>
            <Text style={styles.rewardDescription}>
              Enjoy a 15% discount on HP laptops with this exclusive promotion.
              Upgrade your tech and enhance your productivity with HP's reliable
              and high-performance laptops, now available at a significant
              discount.
            </Text>
            <View style={styles.starsContainer}>
              <Text style={styles.rewardStars}>400</Text>
              <Ionicons name="star" size={24} color="#FFD700" />
            </View>
            <Text style={styles.rewardDescription}>
              Walk for 40 kilometres to redeem this reward. Collect 10 stars per
              kilometre walked.
            </Text>
            <View style={styles.lockContainer}>
              <Ionicons name="lock-closed" size={30} color="#ccc" />
              <Text style={styles.lockText}>Currently Unavailable</Text>
            </View>
            <Text style={styles.unlockText}>
              Complete your current reward to unlock this reward.
            </Text>
          </View>
        </View>
        <View style={styles.rewardSection}>
          <Text style={styles.sectionTitle}>Your Rewards</Text>
          <View style={styles.rewardCard}>
            <View style={styles.rewardItem}>
              <View style={styles.rewardItemTextContainer}>
                <Text style={styles.rewardItemText}>20% off The Body Shop</Text>
                <Text style={styles.expiryText}>Redeem within 5 days</Text>
              </View>
              <TouchableOpacity
                style={styles.redeemButton}
                onPress={() => navigation.navigate("QRCodeScreen")} // navigate to QR code screen
              >
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rewardItem}>
              <View style={styles.rewardItemTextContainer}>
                <Text style={styles.rewardItemText}>15% off Ann Summers</Text>
                <Text style={styles.expiryText}>Code Expired</Text>
              </View>
              <TouchableOpacity style={styles.expiredButton} disabled>
                <Text style={styles.expiredButtonText}>Expired</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rewardItem}>
              <View style={styles.rewardItemTextContainer}>
                <Text style={styles.rewardItemText}>
                  15% off National Express
                </Text>
              </View>
              <TouchableOpacity style={styles.redeemedButton} disabled>
                <Text style={styles.redeemedButtonText}>Redeemed</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rewardItem}>
              <View style={styles.rewardItemTextContainer}>
                <Text style={styles.rewardItemText}>10% off Boots</Text>
              </View>
              <TouchableOpacity style={styles.redeemedButton} disabled>
                <Text style={styles.redeemedButtonText}>Redeemed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d572c",
  },
  currentRewardContainer: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  currentRewardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  currentRewardDescription: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rewardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardStarsTitle: {
    color: "#f0a500",
    fontSize: 16,
    fontWeight: "bold",
  },
  rewardStarsValue: {
    color: "#f0a500",
    fontSize: 32,
    fontWeight: "bold",
  },
  rewardStarsDetails: {
    color: "#fff",
    fontSize: 14,
  },
  rewardStarsPerKm: {
    color: "#fff",
    fontSize: 14,
  },
  progressContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  goalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    backgroundColor: "#fff",
    height: 10,
    borderRadius: 5,
    width: "100%",
    overflow: "hidden",
    marginVertical: 10,
  },
  progress: {
    backgroundColor: "#f0a500",
    height: "100%",
  },
  progressText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  rewardSection: {
    marginBottom: 20,
  },
  rewardCard: {
    backgroundColor: "#2d572c",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  rewardCardDisabled: {
    backgroundColor: "#2d572c90",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  currentRewardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  currentReward: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  nextRewardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  nextReward: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  rewardStars: {
    fontSize: 32,
    color: "#FFD700",
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rewardDescription: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  progressContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  goalText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },

  lockContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  lockText: {
    fontSize: 16,
    color: "#ccc",
    marginLeft: 5,
  },
  unlockText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d572c",
    marginBottom: 10,
  },
  rewardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },

  rewardItemText: {
    fontSize: 16,
    color: "#fff",
  },
  redeemButton: {
    backgroundColor: "#4caf50",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 80,
    alignItems: "center",
  },
  redeemButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  expiredButton: {
    backgroundColor: "#f44336",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 80,
    alignItems: "center",
  },
  expiredButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  redeemedButton: {
    backgroundColor: "#bdbdbd",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 80,
    alignItems: "center",
  },
  redeemedButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  expiryText: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 5,
  },
});

export default RewardsScreen;
