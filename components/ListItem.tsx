import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ListItemProps {
    name: string;
    description: React.ReactNode;
    route?: string;
    style?: StyleProp<ViewStyle>;
}

const ListItemComponent: React.FC<ListItemProps> = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(props.route || props.name)}>
            <View style={styles.item}>
                <Text>&mdash;</Text>
                <View>
                    <Text>{props.name}</Text>
                    <Text>{props.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 0,
        flexDirection: 'row',
    },
});

export default ListItemComponent;