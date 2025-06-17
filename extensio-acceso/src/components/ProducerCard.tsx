import React from "react";
import { Card, Avatar, Text } from "react-native-paper";
import { Producer } from "../models/Producer";

type Props = {
  producer: Producer;
  onPress: () => void;
};

export default function ProducerCard({ producer, onPress }: Props) {
  return (
    <Card style={{ margin: 8 }} onPress={onPress}>
      <Card.Title
        title={producer.name}
        subtitle={producer.phone}
        left={(props) => (
          <Avatar.Image size={48} source={{ uri: producer.photo }} />
        )}
      />
      <Card.Content>
        <Text>{producer.country}</Text>
      </Card.Content>
    </Card>
  );
}
