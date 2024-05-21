import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { bannerApi } from '../../../api/banner/bannerApi';

const SLIDER_WIDTH = Dimensions.get('window').width;

const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={styles.card} key={index}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
        </View>
    );
};

const BannerComponent: React.FC = () => {
    const isCarousel = useRef(null);
    const [dataBanner, setDataBanner] = useState([]);
    const fetchBanner = async () => {
        const res = await bannerApi.getAllBanner();

        if (res && res.data && res.data.data) {
            setDataBanner(res.data.data)
        }
    }

    useEffect(() => {
        fetchBanner();
    }, []);

    const renderItem = ({ item, index }) => {
        return <CarouselCardItem item={item} index={index} />;
    };

    return (
        <View style={styles.container}>
            <Carousel
                loop={true}
                layout='default'
                layoutCardOffset={9}
                ref={isCarousel}
                data={dataBanner}
                autoplay={true}
                autoplayDelay={500}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
                vertical={false}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%'
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: 'fill',
    }
});

export default BannerComponent;
