import { useRef, useState } from 'react'
import { Button, Input, Flex, Text, Divider, Box } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons';
import './App.css'

type ListItem = {
  title: string;
  completed: boolean;
}

function App() {
  const [list, setList] = useState<ListItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addToList = () => {
    if(inputRef.current && inputRef.current.value) {
      setList([{ title: inputRef.current.value, completed: false }, ...list]);
      inputRef.current.value = '';
    }
  };

  const removeTask = (index: number) => {
    setList(state => state.filter((_, i) => i !== index));
  };

  const changeCompleted = (index: number) => {
    const nextState = list.map((todo, i) => {
      if(i === index) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    setList(nextState);
  }



  return (
    <>
      <Text fontSize={25} fontWeight='bold' marginBottom={2}>Lista de Tarefas</Text>
      <Flex>
        <Input focusBorderColor='#008080' marginRight={2} ref={inputRef} marginBottom={10} boxShadow="xl" placeholder='Adicionar a lista' />
        <Button backgroundColor='teal' outline={0} _hover={{
          background: '#005f5f',
          opacity: 1,
        }} boxShadow='xl' onClick={addToList}>
          <AddIcon color="white"  />
        </Button>
      </Flex>
      <Flex flexDir="column" alignItems='flex-start' >
        {list.map((todo, index) => (
          <Box key={index} minWidth='full' marginBottom={2}>
            <Flex flexDir='row' alignItems='center' justifyContent='space-between'>
                <Text textDecor={todo.completed ? 'line-through' : 'none'}>{todo.title}</Text>
                <Box>
                  <CheckIcon onClick={() => changeCompleted(index)} cursor='pointer' color={todo.completed ? 'teal' : 'gray.400'} marginRight={5}/>
                  <DeleteIcon onClick={() => removeTask(index)} cursor='pointer' color='teal' /> 
                </Box>
            </Flex>
            <Divider />
          </Box>
        ))}
      </Flex>
      
    </>
  )
}

export default App
