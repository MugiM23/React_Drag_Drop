import React, { useState, useContext, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MoreOutlined } from '@ant-design/icons';
import _isEmpty from 'lodash/isEmpty'

import ticketsJson from '../Constants/TicketsJson';
import FiveStarUI from './CommonUI/FiveStarUI';
import ProfileIcon from './CommonUI/ProfileIcon';
import { getRandomBackgroundColor } from '../Utilities/CommonFunctions';
import { AppContext } from './Context';


export default function ContentBody() {

  const [tickets, setTickets] = useState(ticketsJson)
  const { searchText } = useContext(AppContext)

  useEffect(() => {
    let updatedTickets = []
    let filteredTickets = {}
    tickets.forEach((item) => item.details.forEach((ticketDetails) => {
      if (ticketDetails.name.includes(searchText)) {
        filteredTickets = item
      }
    }))
    if(!_isEmpty(filteredTickets)){
      updatedTickets = [{...filteredTickets, details:filteredTickets.details.filter((item)=>item.name.includes(searchText))}]   
    }
    if(searchText===''){
      updatedTickets=ticketsJson
    }
    if(updatedTickets.length){
      setTickets(updatedTickets)
    }
  }, [searchText])

  function onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    // sind defines the source index
    // dind defines the destination index
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    // Here only ordering the ticket since the we are moving in the same container
    if (sInd === dInd) {
      const items = reorder(tickets[sInd], source.index, destination.index);
      const newState = [...tickets];
      newState[sInd] = items;
      setTickets(newState);
    } else {
      // Here we are intended to reorder the ticket container since one ticket is moving to another container.
      const result = move(tickets[sInd], tickets[dInd], source, destination);
      const newState = [...tickets];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setTickets(newState.filter(group => group.details.length));
    }
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list.details);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    let updatedResult = { ...list, details: result }
    return updatedResult;
  };
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.details);
    const destClone = Array.from(destination.details);
    const [removed] = sourceClone.splice(droppableSource.index, 1); // removing the selected item from the container.
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = { ...source, details: [...sourceClone] };
    result[droppableDestination.droppableId] = { ...destination, details: [...destClone] };
    return result;
  };
  const getListStyle = isDraggingOver => ({
    padding: 10,
    width: 250
  });
  const getItemStyle = (isDragging, draggableStyle, index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: '10px 5px',
    marginTop: 20,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",
    borderRadius: 5,
    // styles we need to apply on draggables
    ...draggableStyle
  });
  return <div className='d-flex flex-direction-row'>
    <DragDropContext onDragEnd={onDragEnd}>
      {
        tickets.map((droppableElem, droppableIndx) => {
          return <Droppable key={droppableIndx} droppableId={`${droppableIndx}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <div className='d-flex bg-white my-3 p-3 rounded align-items-center'
                  style={{ borderLeft: `5px solid ${getRandomBackgroundColor()}` }}>
                  <label className='text-black'>{droppableElem.title}</label>
                  <label >{' - '}</label>
                  <label >{' '}{droppableElem.details.length}</label>
                </div>
                {
                  droppableElem.details.map((item, index) => {
                    return <Draggable
                      key={item.id}
                      draggableId={`${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            index
                          )}
                        >
                          <div className='d-flex'>
                            <div style={{ borderLeft: item.isActive ? 'none' : `3px solid ${getRandomBackgroundColor()}` }}>

                            </div>
                            <div className='d-flex flex-column justify-content-between w-100 px-2'>
                              <div>
                                <label className='title'>{item.name}</label>
                                <div>
                                  <label className='subtitle'>{item.company}</label>
                                </div>
                              </div>
                              <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                  <FiveStarUI />
                                </div>
                                <div className='d-flex align-items-center'>
                                  {
                                    item.isActive &&
                                    <ProfileIcon
                                      containerClassName='rounded_Icon'
                                      label='s'
                                      labelClassName='text-white' />
                                  }
                                  <MoreOutlined />
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}
                    </Draggable>
                  })
                }
              </div>
            )}
          </Droppable>
        })
      }
    </DragDropContext>
  </div>
}