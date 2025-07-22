package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ContratTestSamples.*;
import static com.mycompany.myapp.domain.PmEntrepriseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContratTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contrat.class);
        Contrat contrat1 = getContratSample1();
        Contrat contrat2 = new Contrat();
        assertThat(contrat1).isNotEqualTo(contrat2);

        contrat2.setId(contrat1.getId());
        assertThat(contrat1).isEqualTo(contrat2);

        contrat2 = getContratSample2();
        assertThat(contrat1).isNotEqualTo(contrat2);
    }

    @Test
    void pmEntrepriseTest() {
        Contrat contrat = getContratRandomSampleGenerator();
        PmEntreprise pmEntrepriseBack = getPmEntrepriseRandomSampleGenerator();

        contrat.setPmEntreprise(pmEntrepriseBack);
        assertThat(contrat.getPmEntreprise()).isEqualTo(pmEntrepriseBack);

        contrat.pmEntreprise(null);
        assertThat(contrat.getPmEntreprise()).isNull();
    }
}
