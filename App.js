import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import InAppBrowser from "react-native-inappbrowser-reborn";

export default function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [activeUrl, setActiveUrl] = useState("");
  const [mode, setMode] = useState("webview"); // 'webview' | 'inapp' | 'browser'

  const normalizeUrl = (url) =>
    url.startsWith("http") ? url : `https://${url}`;

  const handleGo = async () => {
    const url = normalizeUrl(inputUrl);

    if (mode === "browser") {
      Linking.openURL(url);
    } else if (mode === "inapp") {
      console.log("here", InAppBrowser);
      try {
        if (await InAppBrowser.isAvailable()) {
          await InAppBrowser.open(url, {
            // iOS
            dismissButtonStyle: "close",
            preferredBarTintColor: "#111",
            preferredControlTintColor: "#3b82f6",
            readerMode: false,
            animated: true,
            modalPresentationStyle: "fullScreen",
            modalTransitionStyle: "coverVertical",
            modalEnabled: true,
            enableBarCollapsing: false,
            // Android
            showTitle: true,
            toolbarColor: "#111",
            secondaryToolbarColor: "#222",
            navigationBarColor: "#111",
            navigationBarDividerColor: "#333",
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
            animations: {
              startEnter: "slide_in_right",
              startExit: "slide_out_left",
              endEnter: "slide_in_left",
              endExit: "slide_out_right",
            },
          });
        } else {
          // Fallback si no está disponible
          Linking.openURL(url);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      setActiveUrl(url);
    }
  };

  const modes = [
    { key: "webview", label: "WebView" },
    { key: "inapp", label: "Browser InApp" },
    { key: "browser", label: "Browser" },
  ];

  return (
    <View style={styles.container}>
      {/* Selector de modo */}
      <View style={styles.modeBar}>
        {modes.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.modeBtn, mode === key && styles.modeBtnActive]}
            onPress={() => setMode(key)}
          >
            <Text
              style={[
                styles.modeBtnText,
                mode === key && styles.modeBtnTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Barra de URL */}
      <View style={styles.bar}>
        <TextInput
          style={styles.input}
          value={inputUrl}
          onChangeText={setInputUrl}
          onSubmitEditing={handleGo}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="go"
          placeholder="https://tu-ngrok-url.app"
          placeholderTextColor="#555"
        />
        <TouchableOpacity style={styles.btn} onPress={handleGo}>
          <Text style={styles.btnText}>Ir</Text>
        </TouchableOpacity>
      </View>

      {activeUrl && mode === "webview" ? (
        <WebView source={{ uri: activeUrl }} style={{ flex: 1 }} />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {mode === "inapp"
              ? "Ingresa una URL — se abrirá el browser nativo"
              : mode === "browser"
                ? "Ingresa una URL — se abrirá el browser externo"
                : "Ingresa una URL y presiona Ir"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  modeBar: {
    flexDirection: "row",
    margin: 8,
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 3,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 6,
  },
  modeBtnActive: { backgroundColor: "#3b82f6" },
  modeBtnText: { color: "#555", fontSize: 12, fontWeight: "bold" },
  modeBtnTextActive: { color: "#fff" },
  bar: { flexDirection: "row", paddingHorizontal: 8, paddingBottom: 8, gap: 8 },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  btn: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", gap: 6 },
  emptyText: { color: "#444", textAlign: "center", paddingHorizontal: 32 },
});
