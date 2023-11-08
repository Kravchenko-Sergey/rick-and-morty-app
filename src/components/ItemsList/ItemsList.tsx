import { Card, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounse";

export const ItemsList = () => {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const getItems = async (name: string) => {
		const res = await axios(`https://rickandmortyapi.com/api/character/?name=${name}`);
		return res
	};
    
        const {data} = useQuery('items', () => getItems(debouncedValue), {
            onSuccess: (data) => {
                console.log(data)
            } 
        })

        console.log(data);
        
        
        const handleItemClick = (id: number) => {
            navigate(`/${id}`)
        }

        const debouncedValue = useDebounce(searchValue, 500)
        
        useEffect(() => {
            getItems(debouncedValue)
        }, [debouncedValue])

    return (
        <>
            <TextField 
                id="outlined-basic" 
                label="Outlined" 
                variant="outlined"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchValue(e.currentTarget.value)
                  }}
            />
            <div>{data?.data.results.map((el: any) => {
                return <Card key={el.id} onClick={() => handleItemClick(el.id)}><img src={el.image} alt="image" /><p>{el.name}</p></Card>
            })}</div>
        </>
    )
}

