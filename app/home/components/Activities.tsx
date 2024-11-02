"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import getPoopHistoryByDate from "@/lib/actions/getPoopHistoryByDate";

const ActivityFetcher = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  useEffect(() => {
    const fetchData = async () => {
      if (!date) return;

      setLoading(true);
      try {
        const response = await getPoopHistoryByDate(date);
        if (response.success) {
          setActivities(response.data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  if (loading) {
    return <div>Loading activities...</div>;
  }

  return activities.length > 0 ? (
    <div>
      {activities.map((activity) => (
        <div key={activity.id}>
          <p>💩 {activity.created_at}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>There are no activities on this day.</p>
  );
};

const Activities = () => {
  const searchParams = useSearchParams();

  const date = searchParams.get("date");

  if (!date) return null;

  return (
    <div>
      <h4> Activities: {date}</h4>
      <ActivityFetcher />
    </div>
  );
};

export default Activities;
