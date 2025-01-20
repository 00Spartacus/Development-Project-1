package Student_Bus.Student_Busm.controller;

import Student_Bus.Student_Busm.entity.Admin;
import Student_Bus.Student_Busm.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/register")
    public Admin registerAdmin(@RequestBody Admin admin) {
        return adminService.registerAdmin(admin);
    }

    @PostMapping("/login")
    public Admin login(@RequestBody Admin loginData) {
        Admin admin = adminService.login(loginData.getAdminId(), loginData.getPassword());
        if (admin != null) {
            return admin;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }
    // Endpoint to assign a bus to an admin
    @PutMapping("/{adminId}/assign-bus/{busId}")
    public Admin assignBusToAdmin(@PathVariable String adminId, @PathVariable String busId) {
        return adminService.assignBusToAdmin(adminId, busId);
    }

}
