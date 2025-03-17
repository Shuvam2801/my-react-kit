import React, { useState } from 'react';
import moment from "moment";
import '../../styles/tailwindcss/QITrackListCard.scss';

interface Position {
  lat?: number;
  lng?: number;
  address?: {
    city?: string;
    region?: string;
    country?: string;
  };
}

interface TripData {
  data: {
    status?: string;
    start_time: string;
    start_position?: Position;
    end_time?: string;
    end_position?: Position;
    max_speed?: number;
    avg_speed?: number;
    gps_distance?: number;
    duration: number;
    activityDetailsMode?: string[];
  };
}

interface QITracksListCardProps {
  data: {
    mode: string;
  } & TripData;
  tracks?: any[]; // From the type definition
}

export const QITracksListCard: React.FC<QITracksListCardProps> = ({ data }) => {
  const [startAddress, setStartAddress] = useState<string | null>(null);
  const [endAddress, setEndAddress] = useState<string | null>(null);
  const { mode, ...tripData } = data;

  function getDuration(value: number, type: "ms" | "s" | "h" | "min" = "ms"): string {
    let duration: number;
  
    switch (type) {
      case "ms":
        duration = value;
        break;
      case "s":
        duration = value * 1000;
        break;
      case "h":
        duration = value * 60 * 60 * 1000;
        break;
      case "min":
        duration = value * 60 * 1000;
        break;
      default:
        duration = value;
        break;
    }
  
    const momentDuration = moment.duration(duration);
    const days = Math.floor(momentDuration.asDays());
    const hours = Math.floor(momentDuration.asHours());
    const minutes = momentDuration.minutes();
    const seconds = momentDuration.seconds();
  
    const padZero = (num: number) => (num < 10 ? "0" + num : num);
  
    let formatted: string;
  
    if (hours >= 24) {
      formatted = `${padZero(days)}d ${padZero(hours - days * 24)}:${padZero(minutes)}`;
    } else {
      formatted = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }
  
    return formatted;
  }

  const {
    status,
    start_time,
    start_position,
    end_time,
    end_position,
    max_speed,
    avg_speed,
    gps_distance,
    duration,
    activityDetailsMode = ["TRIP"],
  } = tripData.data;

  const reverseGeocodeAddress = (pos?: Position) => {
    if (!pos || !pos.address) return "";
    return `${pos.address.city || ""}, ${pos.address.region || ""}, ${pos.address.country || ""}`;
  };

  const timeConversion = (time?: string) => {
    if (!time) return "";
    return moment(time)?.format(" DD/MM/YYYY - hh:mm:ss A");
  };

  const fallbackLocation = (pos?: Position) => {
    if (pos?.lat && pos?.lng) {
      return `${pos.lat}, ${pos.lng}`;
    } else {
      return "No Data Recorded";
    }
  };

  const renderModes = () => {
    return (
      <section>
        <header className="activities_header">
          <strong>{mode}</strong>

          {status && <span>{status}</span>}
        </header>

        <div className="trip-card">
          <div className="start-time-and-location">
            <strong>Start Time - </strong>
            <span>{timeConversion(start_time)}</span>

            <div className="start-position">
              <strong>Start Location - </strong>
              <span>
                {start_position?.address
                  ? reverseGeocodeAddress(start_position)
                  : fallbackLocation(start_position)}
              </span>
            </div>
          </div>

          {activityDetailsMode?.includes(mode) && (
            <div className="activity-details">
              {gps_distance && <div>{`Distance :  ${(gps_distance / 1000).toFixed(1)} Km`}</div>}

              {end_time && <div>Duration : {getDuration(duration)}</div>}
            </div>
          )}

          <div className="end-time-and-location">
            <strong>End Time - </strong>
            <span>{end_time ? timeConversion(end_time) : "In Progress"}</span>

            <div className="end-position">
              <span>
                <strong>End Location -</strong>{" "}
                {end_position?.address
                  ? reverseGeocodeAddress(end_position)
                  : fallbackLocation(end_position)}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <li className="track-cardlist">{renderModes()}</li>;
};

