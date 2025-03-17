import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QITracksListCard } from './index';
import moment from 'moment';

describe('QITracksListCard Component', () => {
  const mockTripData = {
    mode: 'TRIP',
    data: {
      status: 'Completed',
      start_time: '2023-01-01T10:00:00Z',
      start_position: {
        address: {
          city: 'San Francisco',
          region: 'CA',
          country: 'USA'
        },
        lat: 37.7749,
        lng: -122.4194
      },
      end_time: '2023-01-01T11:30:00Z',
      end_position: {
        address: {
          city: 'Oakland',
          region: 'CA',
          country: 'USA'
        },
        lat: 37.8044,
        lng: -122.2711
      },
      max_speed: 65,
      avg_speed: 45,
      gps_distance: 15000, // 15 km in meters
      duration: 5400000, // 1.5 hours in milliseconds
      activityDetailsMode: ['TRIP']
    }
  };

  // Helper function to create custom data
  const createMockData = (customData = {}) => {
    return {
      mode: 'TRIP',
      data: {
        ...mockTripData.data,
        ...customData
      }
    };
  };

  test('renders trip information correctly with complete data', () => {
    render(<QITracksListCard data={mockTripData} />);

    // Check mode and status
    expect(screen.getByText('TRIP')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();

    // Check start and end location labels
    expect(screen.getByText('Start Time -')).toBeInTheDocument();
    expect(screen.getByText('End Time -')).toBeInTheDocument();
    
    // Check location data instead of formatted times which may vary
    expect(screen.getByText('San Francisco,CA,USA')).toBeInTheDocument();
    expect(screen.getByText('Oakland,CA,USA')).toBeInTheDocument();

    // Check activity details without relying on exact formatting
    expect(screen.getByText(/Distance : 15.0 Km/)).toBeInTheDocument();
    expect(screen.getByText(/Duration : /)).toBeInTheDocument();
  });

  test('handles trip in progress (no end time)', () => {
    const inProgressData = createMockData({
      end_time: null,
      status: 'In Progress'
    });

    render(<QITracksListCard data={inProgressData} />);
    
    // Only check for status text to avoid duplication issue
    expect(screen.getByText('In Progress', { selector: '.activities_header span' })).toBeInTheDocument();
    
    // Check for "In Progress" text near End Time label
    const endTimeElement = screen.getByText('End Time -');
    const endTimeParent = endTimeElement.parentElement;
    expect(endTimeParent).toHaveTextContent('In Progress');
  });

  test('handles missing address data properly', () => {
    const noAddressData = createMockData({
      start_position: {
        lat: 37.7749,
        lng: -122.4194
      },
      end_position: {
        lat: 37.8044,
        lng: -122.2711
      }
    });

    render(<QITracksListCard data={noAddressData} />);
    
    // Should show coordinates when no address is available
    expect(screen.getByText('37.7749,-122.4194')).toBeInTheDocument();
    expect(screen.getByText('37.8044,-122.2711')).toBeInTheDocument();
  });

  test('handles completely missing position data', () => {
    const noPositionData = createMockData({
      start_position: {},
      end_position: {}
    });

    render(<QITracksListCard data={noPositionData} />);
    
    expect(screen.getAllByText('No Data Recorded')).toHaveLength(2);
  });

  test('handles different duration formats correctly', () => {
    // Test for hours
    const hourData = createMockData({
      duration: 7200000 // 2 hours in ms
    });
    const { unmount } = render(<QITracksListCard data={hourData} />);
    expect(screen.getByText('Duration : 02:00:00')).toBeInTheDocument();
    unmount();

    // Test for days
    const dayData = createMockData({
      duration: 172800000 // 48 hours in ms
    });
    render(<QITracksListCard data={dayData} />);
    expect(screen.getByText('Duration : 02d 00:00')).toBeInTheDocument();
  });

  test('does not show activity details for non-TRIP modes', () => {
    const nonTripData = {
      mode: 'WALKING',
      data: {
        ...mockTripData.data,
        activityDetailsMode: ['TRIP'] // Only TRIP mode should show details
      }
    };

    render(<QITracksListCard data={nonTripData} />);
    
    // Activity details should not be present
    expect(screen.queryByText(/Distance/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Duration/)).not.toBeInTheDocument();
  });

  test('handles missing GPS distance', () => {
    const noDistanceData = createMockData({
      gps_distance: null
    });

    render(<QITracksListCard data={noDistanceData} />);
    
    // Should not show distance
    expect(screen.queryByText(/Distance/)).not.toBeInTheDocument();
    // But duration should still appear
    expect(screen.getByText(/Duration/)).toBeInTheDocument();
  });
});