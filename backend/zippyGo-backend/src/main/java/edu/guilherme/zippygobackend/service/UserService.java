package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.User;
import edu.guilherme.zippygobackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findById(UUID id){
        return userRepository.findById(id);
    }

    public void deleteUserById(UUID id){
        userRepository.deleteById(id);
    }
}
