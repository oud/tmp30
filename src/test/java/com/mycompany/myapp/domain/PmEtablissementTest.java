package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.GroupeTestSamples.*;
import static com.mycompany.myapp.domain.PmEtablissementTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PmEtablissementTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PmEtablissement.class);
        PmEtablissement pmEtablissement1 = getPmEtablissementSample1();
        PmEtablissement pmEtablissement2 = new PmEtablissement();
        assertThat(pmEtablissement1).isNotEqualTo(pmEtablissement2);

        pmEtablissement2.setId(pmEtablissement1.getId());
        assertThat(pmEtablissement1).isEqualTo(pmEtablissement2);

        pmEtablissement2 = getPmEtablissementSample2();
        assertThat(pmEtablissement1).isNotEqualTo(pmEtablissement2);
    }

    @Test
    void groupeTest() {
        PmEtablissement pmEtablissement = getPmEtablissementRandomSampleGenerator();
        Groupe groupeBack = getGroupeRandomSampleGenerator();

        pmEtablissement.setGroupe(groupeBack);
        assertThat(pmEtablissement.getGroupe()).isEqualTo(groupeBack);

        pmEtablissement.groupe(null);
        assertThat(pmEtablissement.getGroupe()).isNull();
    }
}
