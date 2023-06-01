import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    SafeAreaView,
    Modal
} from 'react-native';
import { DataList } from '../assets/data/DataList'
import Colors from '../assets/Colors';
import Header from '../components/Header';

const HomeScreen = () => {

    const [List, setList] = useState([])
    const [searched, setSearched] = useState('')
    const Rank = useRef(-1)
    const userMatch = useRef(null)
    const [modalVisible, setModalVisible] = useState(false);

    const onSearch = () => {

        let DataListTemp = [...DataList]
        DataListTemp.sort(function (a, b) { return b.bananas - a.bananas })
        userMatch.current = null

        for (let i = 0; i < DataListTemp.length; i++) {
            const user = DataListTemp[i]
            if (user.name.toLowerCase().indexOf(searched.toLowerCase()) > -1) {
                console.log("user.name", user.name, searched, user.name.toLowerCase().indexOf(searched.toLowerCase()))
                userMatch.current = user
                Rank.current = i
                break;
            }
        }

        const FirstTenUsers = DataListTemp.slice(0, 10)
        if (userMatch.current === null) {
            setModalVisible(true)
        }
        else if (Rank.current < 10) {
            setList(FirstTenUsers)
        } else if (userMatch.current != null) {
            setList([...FirstTenUsers.slice(0, 9), userMatch.current])
        }
    }

    const renderItem = ({ item, index }) => {
        const isSearched = item.name === userMatch.current?.name
        return (
            <View key={index} style={[styles.flatlist, { borderColor: isSearched ? Colors.purple : Colors.grey, }]}>
                <Text
                    style={{
                        ...styles.flatlistText,
                        flex: 2, textAlign: 'left',
                        color: isSearched ? Colors.purple : Colors.black
                    }}>{item?.name}</Text>
                <Text style={styles.flatlistText}>{(isSearched ? Rank.current : index) + 1}</Text>
                <Text style={styles.flatlistText}>{item?.bananas}</Text>
                <Text style={{ ...styles.flatlistText, color: isSearched ? Colors.purple : Colors.black }}>{isSearched ? 'Yes' : "No"}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header />
            <View style={styles.inputCon}>
                <View style={styles.inputWrap}>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Enter User...'
                        onChangeText={(val) => setSearched(val)}
                    />
                    <TouchableOpacity style={styles.SearchIcon} onPress={() => onSearch()}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/images/search.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.title}>
                <Text style={{ ...styles.titleText, flex: 2, paddingLeft: 10 }}>User Name</Text>
                <Text style={styles.titleText}>Rank</Text>
                <Text style={styles.titleText}>Bananas</Text>
                <Text style={styles.titleText}>User?</Text>
            </View>
            <View style={styles.sheet}>
                <FlatList
                    data={List}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => <Text style={styles.emptext}>{"Please Search User"}</Text>}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>This user name does not exist! Please specify an existing user name</Text>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"yellow"
    },
    inputCon: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        margin: 10,
        marginTop: 20
    },
    inputWrap: {
        flex: 1,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        borderColor: Colors.grey
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: Colors.white
    },
    textinput: {
        flex: 1,
    },
    SearchIcon: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.purple,
        padding: 5
    },

    sheet: {
        height: '100%',
        marginHorizontal: 10,

    },
    title: {
        flexDirection: "row",
        margin: 10,
        height: 60,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: "center",
        borderColor: Colors.grey,
        backgroundColor: Colors.purple
    },
    flatlist: {
        flexDirection: "row",
        borderWidth: 1,
        marginBottom: 5,
        padding: 15,
        // borderBottomWidth: 0
    },
    titleText: {
        fontSize: 14,
        fontWeight: 500,
        color: Colors.white,
        flex: 1
    },
    flatlistText: {
        color: Colors.black,
        fontSize: 12,
        flex: 1,
        textAlign: "center"
    },
    emptext: {
        color: Colors.black,
        alignSelf: 'center',
        marginTop: "50%",
        fontSize: 14
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00000099"
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 12,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: Colors.purple,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 14,
        color: Colors.black
    },

});

export default HomeScreen;
