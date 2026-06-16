package com.zubiar.campusfest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardUpdate {
    private long totalRegistrations;
    private long totalCheckins;

}
