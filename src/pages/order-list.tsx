import { Box, Container, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string): Promise<Record> =>
    axios.get(url).then((res) => res.data);

const orderList = () => {
    const {data, error, isValidating} = useSWR('/api/order', fetcher)
    const records = data?.records


    if (error) {
        return (
            <div>failed to load</div>
        )
    }

    if (data === undefined) {
        return (
            <div>loading</div>
        )
    }

    return (
        <Container maxW={"container.xl"} centerContent>
            <Box>
                <Text color={"blue"} align={"center"} fontSize={"5xl"}>2478</Text>
                <Box>
                    <Table variant={"striped"} fontSize={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>発注日</Th>
                                <Th>受取日</Th>
                                <Th>コーヒーNo</Th>
                                <Th>商品名</Th>
                                <Th>個数</Th>
                                <Th>金額</Th>
                                <Th>グラム</Th>
                                <Th>ロースト</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {records.map((record: Record) => (
                                <Tr key={record.id.value}>
                                    <Td>{record.id.value}</Td>
                                    <Td>{record.purchase_order_date.value}</Td>
                                    <Td>{record.receiving_date.value}</Td>
                                    <Td>{record.coffee_no.value}</Td>
                                    <Td>{record.product_name.value}</Td>
                                    <Td>{record.count.value}</Td>
                                    <Td>{record.price.value}</Td>
                                    <Td>{record.grams.value}</Td>
                                    <Td>{record.roast.value}</Td>
                                    <Td></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Container>
    )
}

type Record = {
    id: {
        type: string,
        value: number
    },
    purchase_order_date: {
        type: string,
        value: Date
    }
    receiving_date: {
        type: string,
        value: Date
    }
    coffee_no: {
        type: string,
        value: number
    }
    product_name: {
        type: string,
        value: string
    }
    count: {
        type: string,
        value: number
    }
    price: {
        type: string,
        value: number
    }
    grams: {
        type: string,
        value: number
    }
    roast: {
        type: string,
        value: number
    }
}

export default orderList