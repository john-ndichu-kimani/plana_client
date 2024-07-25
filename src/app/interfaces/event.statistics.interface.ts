export interface EventStatistic {
    statistic_id: string;
    event_id: string;
    total_attendees: number;
    total_revenue: number;
    created_at: Date;
    updated_at: Date;
    event: Event;
  }
  