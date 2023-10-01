package com.backend.os.config;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@Component
public class FirebaseFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if(authorizationHeader != null || authorizationHeader.startsWith("Bearer ")) {
            FirebaseToken decodedToken = null;

            try {
                String token = authorizationHeader.substring(7);
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            }
            catch (FirebaseAuthException e) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Error! "+e.toString());
            }

            if (decodedToken == null){
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token!");
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token!");
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().startsWith("/verifyFirebaseToken");
    }
}
