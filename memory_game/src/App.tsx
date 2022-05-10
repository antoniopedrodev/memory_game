import { useState, useEffect } from 'react';
import {Container, Info, LogoLink, InfoArea, GridArea,Grid} from './App.styles';
import { InfoItem } from './components/InfoItem';
import logoImage from './assets/media/reactmemory.png';
import { Button } from './components/Button';
import RestartIcon from './assets/media/restart.svg';
import { GridItemType } from './types/GridItemType';
import {Items} from './data/items'
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if(showCount === 2) {
      let openedCards = gridItems.filter(item => item.show === true);

      if(openedCards.length === 2) {

        if(openedCards[0].item === openedCards[1].item) {
          
          let tempGrid = [...gridItems];

          for(let i in tempGrid) {
            if(tempGrid[i].show === true) {
              tempGrid[i].permanentShow = true;
              tempGrid[i].show = false;
            }
          }

          setGridItems(tempGrid);
          setShowCount(0);
          
        } else {

          setTimeout(() => {
            let tempGrid = [...gridItems];
          
            for(let i in tempGrid) {
              tempGrid[i].show = false;
            }

            setGridItems(tempGrid);
            setShowCount(0);
          }, 1500);
        }
        
        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShow === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {

    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    let tempGrid: GridItemType[] = [];

    for(let i = 0; i < (Items.length * 2); i++) {
      tempGrid.push({
        item: null,
        show: false,
        permanentShow: false
      });
    }

    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < Items.length; i++) {
        let position = -1;
        while(position < 0 || tempGrid[position].item !== null) {
          position = Math.floor(Math.random() * (Items.length * 2));
        }
        
        tempGrid[position].item = i;
      }
    }

    setGridItems(tempGrid);

    setPlaying(true);
  }

  const HandleItemClick = (index: number) => {
    if(playing && index !== null && showCount < 2) {
      let tempGrid = [...gridItems]

      if (tempGrid[index].permanentShow === false && tempGrid[index].show === false) {
        tempGrid[index].show = true;
        setShowCount(showCount + 1);
      }

      setGridItems(tempGrid);
    }
  }

  return (
    <Container>
      <Info>
        <LogoLink>
          <img src={logoImage} width="200" alt="Logo da aplicação React Memory"/>
        </LogoLink>

        <InfoArea>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label='Movimentos' value={moveCount.toString()}/>
        </InfoArea>

        <Button 
          label='Reiniciar'
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </Info>
      <GridArea>
        <Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => HandleItemClick(index)} />
          ))}
        </Grid>
      </GridArea>
    </Container>
  );
}

export default App;