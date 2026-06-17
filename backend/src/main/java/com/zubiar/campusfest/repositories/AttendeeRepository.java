package com.zubiar.campusfest.repositories;

import com.zubiar.campusfest.model.Attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AttendeeRepository extends JpaRepository<Attendance, Long> {

        boolean existsByEmail(String email);

        @Query("""
                        SELECT HOUR(a.registeredAt), COUNT(a)
                        FROM Attendance a
                        WHERE a.registeredAt >= :startOfDay
                        GROUP BY HOUR(a.registeredAt)
                        ORDER BY HOUR(a.registeredAt)
                        """)
        List<Object[]> findHourlyCountsSince(@Param("startOfDay") LocalDateTime startOfDay);

        @Query("""
                        SELECT a.department, COUNT(a)
                        FROM Attendance a
                        WHERE a.department IS NOT NULL
                        GROUP BY a.department
                        ORDER BY COUNT(a) DESC
                        """)
        List<Object[]> findDepartmentBreakdown();

        List<Attendance> findTop10ByOrderByRegisteredAtDesc();
}
