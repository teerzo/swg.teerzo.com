'use client';

import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

// Sample event data - in a real app, this would come from an API or database
const sampleEvents = [
  {
    id: 1,
    title: 'Imperial Base Raid',
    date: new Date(2024, 2, 15, 19, 0), // March 15, 2024, 7:00 PM
    description: 'Join the Imperial forces for a coordinated raid on a Rebel base.',
    location: 'Tatooine - Anchorhead',
    faction: 'Imperial',
    type: 'PvP',
  },
  {
    id: 2,
    title: 'Crafting Competition',
    date: new Date(2024, 2, 20, 18, 0), // March 20, 2024, 6:00 PM
    description: 'Show off your crafting skills and win prizes!',
    location: 'Corellia - Coronet',
    faction: 'Neutral',
    type: 'Crafting',
  },
  {
    id: 3,
    title: 'Rebel Recruitment Drive',
    date: new Date(2024, 2, 25, 20, 0), // March 25, 2024, 8:00 PM
    description: 'Join the Rebel Alliance and fight for freedom!',
    location: 'Naboo - Theed',
    faction: 'Rebel',
    type: 'Social',
  },
];

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState(sampleEvents);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: '19:00',
    description: '',
    location: '',
    faction: 'Neutral',
    type: 'Social',
  });

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  // Get the last day of the month
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  // Get the total number of days in the month
  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Generate an array of days for the calendar
  const daysInMonth = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  // Generate an array of empty cells for days before the first day of the month
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Jump to today's date
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Check if a date has events
  const hasEvents = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.some(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Handle date selection
  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    const [hours, minutes] = newEvent.time.split(':').map(Number);
    const eventDate = new Date(newEvent.date);
    eventDate.setHours(hours, minutes);
    
    const newEventWithId = {
      id: events.length + 1,
      title: newEvent.title,
      date: eventDate,
      description: newEvent.description,
      location: newEvent.location,
      faction: newEvent.faction,
      type: newEvent.type,
    };
    
    setEvents([...events, newEventWithId]);
    setShowAddEventModal(false);
    setNewEvent({
      title: '',
      date: new Date(),
      time: '19:00',
      description: '',
      location: '',
      faction: 'Neutral',
      type: 'Social',
    });
  };

  // Handle input change for new event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">SWG Events Calendar</h1>
        <button 
          onClick={() => setShowAddEventModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <FaPlus className="mr-2" /> Add Event
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="w-24">
            <button 
              onClick={goToToday}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 w-48 text-center">{formatDate(currentDate)}</h2>
            <button 
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="w-24"></div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-700 dark:text-gray-300 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}
          
          {daysInMonth.map(day => (
            <div 
              key={day} 
              className={`aspect-square border border-gray-200 dark:border-gray-700 rounded-md p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                selectedDate && 
                selectedDate.getDate() === day && 
                selectedDate.getMonth() === currentDate.getMonth() && 
                selectedDate.getFullYear() === currentDate.getFullYear() 
                  ? 'bg-blue-100 dark:bg-blue-900' 
                  : ''
              }`}
              onClick={() => handleDateClick(day)}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</span>
                {hasEvents(day) && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
              
              {selectedDate && 
               selectedDate.getDate() === day && 
               selectedDate.getMonth() === currentDate.getMonth() && 
               selectedDate.getFullYear() === currentDate.getFullYear() && (
                <div className="mt-1">
                  {getEventsForDate(day).map(event => (
                    <div 
                      key={event.id} 
                      className="text-xs p-1 mb-1 rounded bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 truncate"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {selectedDate && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          
          {getEventsForDate(selectedDate.getDate()).length > 0 ? (
            <div className="space-y-4">
              {getEventsForDate(selectedDate.getDate()).map(event => (
                <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{event.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.faction === 'Imperial' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      event.faction === 'Rebel' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {event.faction}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      {event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {event.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No events scheduled for this day.</p>
          )}
        </div>
      )}
      
      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add New Event</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEvent.date.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setNewEvent(prev => ({ ...prev, date }));
                    }}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="faction" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Faction
                  </label>
                  <select
                    id="faction"
                    name="faction"
                    value={newEvent.faction}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Imperial">Imperial</option>
                    <option value="Rebel">Rebel</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PvP">PvP</option>
                    <option value="PvE">PvE</option>
                    <option value="Crafting">Crafting</option>
                    <option value="Social">Social</option>
                    <option value="Guild">Guild</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
