package com.smart.tarotapp.repositories;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import com.smart.tarotapp.models.ERole;
import com.smart.tarotapp.models.Role;

@Repository
public interface RoleRepository {
  Optional<Role> findByName(ERole name);
}
