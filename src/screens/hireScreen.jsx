import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageCarousel from "../components/carouselAdComponent";
import MaestrosScroll from "../components/scrollViewMaestros";

import LottieView from 'lottie-react-native';


import { useFonts } from "expo-font";

const Hire = () => {
}

export default Hire;