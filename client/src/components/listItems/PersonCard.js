import { Card, Button } from "antd";
import CarCard from "./CarCard";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";

const PersonCard = (props) => {
  const { id, firstName, lastName, carsOwned, listOfPeople } = props;
  const [editMode, setEditmode] = useState(false);
  const navigate = useNavigate();

  const handleEditButton = () => {
    setEditmode(!editMode);
  };

  const handleLearnMore = (personId) => {
    navigate(`/people/${personId}`);
  };

  const carList =
    carsOwned.length > 0 ? (
      carsOwned.map((car) => (
        <CarCard
          id={car.id}
          year={car.year}
          make={car.make}
          model={car.model}
          price={car.price}
          personId={car.personId}
          key={car.id}
          listOfPeople={listOfPeople}
        />
      ))
    ) : (
      <></>
    );

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onCancel={handleEditButton}
          carList={carList}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={{ margin: "1rem 0" }}
          actions={[
            <EditOutlined key="edit" onClick={handleEditButton} />,
            <RemovePerson id={id} />,
          ]}
        >
          {carList}
          <Button onClick={() => handleLearnMore(id)} style={{ marginTop: '10px' }}>
            Learn More
          </Button>
        </Card>
      )}
    </>
  );
};

export default PersonCard;
