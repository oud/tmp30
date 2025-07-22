package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Contrat;
import com.mycompany.myapp.domain.Groupe;
import com.mycompany.myapp.domain.PmEtablissement;
import com.mycompany.myapp.service.dto.ContratDTO;
import com.mycompany.myapp.service.dto.GroupeDTO;
import com.mycompany.myapp.service.dto.PmEtablissementDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PmEtablissement} and its DTO {@link PmEtablissementDTO}.
 */
@Mapper(componentModel = "spring")
public interface PmEtablissementMapper extends EntityMapper<PmEtablissementDTO, PmEtablissement> {
    @Mapping(target = "contrat", source = "contrat", qualifiedByName = "contratId")
    @Mapping(target = "groupe", source = "groupe", qualifiedByName = "groupeId")
    PmEtablissementDTO toDto(PmEtablissement s);

    @Named("contratId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContratDTO toDtoContratId(Contrat contrat);

    @Named("groupeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    GroupeDTO toDtoGroupeId(Groupe groupe);
}
