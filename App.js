import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [mode, setMode] = useState('webview'); // 'webview' | 'browser'

  const handleGo = () => {
    const url = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
    if (mode === 'browser') {
      Linking.openURL(url);
    } else {
      setActiveUrl(url);
    }
  };

  return (
    <View style={styles.container}>
      {/* Selector de modo */}
      <View style={styles.modeBar}>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'webview' && styles.modeBtnActive]}
          onPress={() => setMode('webview')}>
          <Text
            style={[
              styles.modeBtnText,
              mode === 'webview' && styles.modeBtnTextActive,
            ]}>
            WebView
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'browser' && styles.modeBtnActive]}
          onPress={() => setMode('browser')}>
          <Text
            style={[
              styles.modeBtnText,
              mode === 'browser' && styles.modeBtnTextActive,
            ]}>
            Browser
          </Text>
        </TouchableOpacity>
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

      {activeUrl && mode === 'webview' ? (
        <WebView
          source={{ uri: activeUrl }}
          style={{ flex: 1 }}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Ingresa una URL y presiona Ir</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  modeBar: {
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 3,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 6,
  },
  modeBtnActive: { backgroundColor: '#3b82f6' },
  modeBtnText: { color: '#555', fontSize: 12, fontWeight: 'bold' },
  modeBtnTextActive: { color: '#fff' },
  bar: { flexDirection: 'row', paddingHorizontal: 8, paddingBottom: 8, gap: 8 },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  btn: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#444' },
});
