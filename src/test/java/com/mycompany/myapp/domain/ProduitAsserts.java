package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ProduitAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProduitAllPropertiesEquals(Produit expected, Produit actual) {
        assertProduitAutoGeneratedPropertiesEquals(expected, actual);
        assertProduitAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProduitAllUpdatablePropertiesEquals(Produit expected, Produit actual) {
        assertProduitUpdatableFieldsEquals(expected, actual);
        assertProduitUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProduitAutoGeneratedPropertiesEquals(Produit expected, Produit actual) {
        assertThat(actual)
            .as("Verify Produit auto generated properties")
            .satisfies(a -> assertThat(a.getId()).as("check id").isEqualTo(expected.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProduitUpdatableFieldsEquals(Produit expected, Produit actual) {
        assertThat(actual)
            .as("Verify Produit relevant properties")
            .satisfies(a -> assertThat(a.getCodeProduit()).as("check codeProduit").isEqualTo(expected.getCodeProduit()))
            .satisfies(a ->
                assertThat(a.getDateAdhesionProduit()).as("check dateAdhesionProduit").isEqualTo(expected.getDateAdhesionProduit())
            )
            .satisfies(a ->
                assertThat(a.getDateRadiationProduit()).as("check dateRadiationProduit").isEqualTo(expected.getDateRadiationProduit())
            )
            .satisfies(a -> assertThat(a.getCodeFormule()).as("check codeFormule").isEqualTo(expected.getCodeFormule()))
            .satisfies(a ->
                assertThat(a.getCodeFamilleRisqueFormule())
                    .as("check codeFamilleRisqueFormule")
                    .isEqualTo(expected.getCodeFamilleRisqueFormule())
            )
            .satisfies(a -> assertThat(a.getTitreFormule()).as("check titreFormule").isEqualTo(expected.getTitreFormule()))
            .satisfies(a -> assertThat(a.getTypeFormule()).as("check typeFormule").isEqualTo(expected.getTypeFormule()))
            .satisfies(a -> assertThat(a.getCodeEtat()).as("check codeEtat").isEqualTo(expected.getCodeEtat()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProduitUpdatableRelationshipsEquals(Produit expected, Produit actual) {
        assertThat(actual)
            .as("Verify Produit relationships")
            .satisfies(a -> assertThat(a.getGroupe()).as("check groupe").isEqualTo(expected.getGroupe()));
    }
}
