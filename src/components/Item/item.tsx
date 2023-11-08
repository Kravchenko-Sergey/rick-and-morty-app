import { Card } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const Item = () => {
    const params = useParams()

    const getItem = async (id: number) => {
		const res = await axios(`https://rickandmortyapi.com/api/character/${id}`);
		return res
	};

    console.log(params);
    

    const query = useQuery('item', () => getItem(Number(params.id)))

    console.log(query);
    

    return (
    <Card>
        <img src={query.data?.data.image} alt="image" />
        <p>{query.data?.data.name}</p>
        <p>{query.data?.data.status}</p>
        <p>{query.data?.data.gender}</p>
    </Card>
    )
}