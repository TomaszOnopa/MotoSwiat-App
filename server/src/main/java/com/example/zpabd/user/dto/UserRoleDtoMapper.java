package com.example.zpabd.user.dto;

import com.example.zpabd.user.User;

public class UserRoleDtoMapper {
    public static UserRoleDto map(User user) {
        Long userId = user.getUserId();
        String username = user.getUsername();
        String role = user.getRole();

        return new UserRoleDto(userId, username, role);
    }
}
