package com.zubiar.campusfest.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class AttendanceStatsResponse {

    private long totalAttendees;
    private List<HourlyCount> hourlyBreakdown;
    private Map<String, Long> departmentBreakdown;
    private List<RecentAttendee> recentAttendees;

    @Data
    @Builder
    public static class HourlyCount {
        private String hour;
        private long count;
    }

    @Data
    @Builder
    public static class RecentAttendee {
        private Long id;
        private String name;
        private String email;
        private String department;
        private String registeredAt;
    }
}
