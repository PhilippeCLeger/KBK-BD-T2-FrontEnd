import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { PÉRIODICITÉ } from "../Enums";
import { TYPES_OUVRAGES } from "../Enums";
import useGetOuvrages from '../hooks/useGetOuvrages';
import OuvrageListItem from "./OuvrageListItem";
import Dropdown from 'react-bootstrap/Dropdown';

const InsertOuvrage = () => {
    const [selectedType, setSelectedType] = useState(TYPES_OUVRAGES.LIVRE);
    const [selectedPeriodicite, setSelectedPeriodicite] = useState("");
    return <>
        <label>
            Titre: <Input name="title"></Input>
        </label>
        <label>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle name="type" id="dropdown-autoclose-true">
                    {selectedType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedType(TYPES_OUVRAGES.LIVRE)}>Livre</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedType(TYPES_OUVRAGES.PÉRIODIQUE)}>Périodique</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </label>
        <label>
            {selectedType ? 
                <Box>
                    <label>
                        Année d'édition: <Input name="anneeEdition"></Input>
                    </label>
                    <label>
                        Maison d'édition: <Input name="maisonEdition"></Input>
                    </label>
                    <label>
                        Auteur principal: <Input name="auteur"></Input>
                    </label>
                </Box> 
                : 
                <Box>
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle name="periodicite" id="dropdown-autoclose-true">
                            {selectedPeriodicite}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedItem(PÉRIODICITÉ.HEBDOMADAIRE)}>Hebdomadaire</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedItem(PÉRIODICITÉ.MENSUELLE)}>Mensuelle</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedItem(PÉRIODICITÉ.JOURNALIÈRE)}>Journalière</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <label>
                        Date de parution: <Input name="dateParution"></Input>
                    </label>
                </Box> 
            }
        </label>
        <label>
            <Text>Exemplaires</Text>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle name="type" id="dropdown-autoclose-true">
                    Exemplaire 1
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item value={true}>Oui</Dropdown.Item>
                    <Dropdown.Item onClick={false}>Non</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle name="type" id="dropdown-autoclose-true">
                    Exemplaire 2
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item value={true}>Oui</Dropdown.Item>
                    <Dropdown.Item onClick={false}>Non</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle name="type" id="dropdown-autoclose-true">
                    Exemplaire 3
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item value={true}>Oui</Dropdown.Item>
                    <Dropdown.Item onClick={false}>Non</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </label>
    </>
}

export default OuvragesList;