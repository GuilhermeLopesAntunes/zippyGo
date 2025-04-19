package edu.guilherme.zippygobackend.dto;

import java.util.List;
import java.util.UUID;

public record StudentAssociationRequest(List<UUID> studentIds) {
}
