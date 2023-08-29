import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Divider} from '@react-native-material/core';

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
  };

  useEffect(() => {
    getNews();
  }, []);
  const apikey = '8defaf2a42d14ce2bf0da75456412c44';
  const q = 'keyword';
  const getNews = async () => {
    await axios
      .get(`https://newsapi.org/v2/everything?q=${q}&apikey=${apikey}`)
      .then(response => {
        if (response.status === 200) {
          const temp = response?.data?.articles?.map(e => {
            return {
              author: e.author,
              content: e.content,
              publishedAt: e.publishedAt,
              id: e.source?.id,
              code: e.source?.name,
              description: e.description,
              title: e.title,
              urlToImage: e.urlToImage,
              url: e.url,
            };
          });
          setData(temp);
        } else {
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    const imgUrl = item.urlToImage;
    const url = item.url;
    return (
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <View style={styles.title}>
            <Text>{item.title}</Text>
          </View>
          <View style={styles.container2}>
            {imgUrl === null ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
                  Error loading image
                </Text>
              </View>
            ) : (
              <Image
                onError={handleImageError}
                source={{uri: imgUrl}}
                style={styles.image}
              />
            )}
          </View>

          <View style={styles.details}>
            <Text style={{color: '#cf0a11'}}>{item.author}</Text>
            <View style={{alignItems: 'center', width: '50%'}}>
              <Text style={{color: '#000'}}>{item.publishedAt}</Text>
            </View>
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text>{item.description}</Text>
        </View>
        <View style={{width: '100%', padding: 5}}>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Text style={{fontWeight: 'bold'}}>SeeMore</Text>
          </TouchableOpacity>
        </View>
        <Divider color="gray" style={styles.devid} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{padding: 10}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Today news</Text>
      </View>

      <View>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  details: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 150,
  },
  devid: {
    width: '100%',
    height: 1,

    marginBottom: 10,
    opacity: 0.5,
  },
});
