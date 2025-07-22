package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ContratTestSamples.*;
import static com.mycompany.myapp.domain.GroupeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GroupeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Groupe.class);
        Groupe groupe1 = getGroupeSample1();
        Groupe groupe2 = new Groupe();
        assertThat(groupe1).isNotEqualTo(groupe2);

        groupe2.setId(groupe1.getId());
        assertThat(groupe1).isEqualTo(groupe2);

        groupe2 = getGroupeSample2();
        assertThat(groupe1).isNotEqualTo(groupe2);
    }

    @Test
    void contratTest() {
        Groupe groupe = getGroupeRandomSampleGenerator();
        Contrat contratBack = getContratRandomSampleGenerator();

        groupe.setContrat(contratBack);
        assertThat(groupe.getContrat()).isEqualTo(contratBack);

        groupe.contrat(null);
        assertThat(groupe.getContrat()).isNull();
    }
}
